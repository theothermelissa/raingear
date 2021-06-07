import React, {useState, useEffect, useReducer} from 'react';
import Airtable from 'airtable';
import {notification} from 'antd';
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import './App.scss';
import recordsReducer from './reducers/recordsReducer';
import EditDrawer from './components/EditDrawer';
import FirehouseCalendar from './components/FirehouseCalendar';
import NavBar from './components/NavBar';
import FundraisersPage from './components/FundraisersPage';
import Profile from './components/Profile';
import OrganizerView from './components/OrganizerView';
import ProtectedRoute from './auth/protected-route';
import {useAuth0} from '@auth0/auth0-react';
import userEvent from '@testing-library/user-event';
import {getFundraiserFields, getRoleSpecificOrderFields, getRoleSpecificSellerFields} from './components/getRecordsFunctions';
import {addRecordToArray} from './components/getRecordsFunctions';
import {chooseTable} from './components/getRecordsFunctions';
import {getRecordType} from './components/getRecordsFunctions';
import {arrayify} from './components/getRecordsFunctions';
import {anyOfThese} from './components/getRecordsFunctions';
import {createFilterFormula} from './components/getRecordsFunctions';
import { indexOf, update } from 'lodash';

export const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appWga5gfjEZX4q7X');
export const RecordsContext = React.createContext(null);
export const RecordsDispatch = React.createContext(null);

const initialState = {
    focusedRecordID: '',
    viewFocusedRecord: false,
    drawerVisible: false,
    recordToEdit: '',
    alert: '',
    recordHasChanged: false,
    hoveredID: null,
    userEmail: '',
    fundraiserToDisplay: '',
    userRole: ''
};

function App() {
    
    const [fundraisers, setFundraisers] = useState({
        "organizerFundraisers": [],
        "sellerFundraisers": [],
        "guardianFundraisers": [],
        "providerFundraisers": [],
    });
    const [recordsState, recordsDispatch] = useReducer(recordsReducer, initialState);
    const [userRecord, setUserRecord] = useState('');
    const [whichDataIsLoaded, setWhichDataIsLoaded] = useState('');
    // const [userRoles, setUserRoles] = useState([]);

    const {user, isAuthenticated} = useAuth0();
    
    // gets & save user's userRecord with fundraiserIDs using their email
    useEffect(() => {
        if (isAuthenticated && !userRecord) {
            base('Users').select({
                    filterByFormula: `{Email} = "${
                    user.email
                }"`
            }).eachPage(function page(records, fetchNextPage) {
                records.forEach(function (record) {
                    let fundraiserList = arrayify(record.fields.allFundraisers)
                    let roleInfo = fundraiserList.map((role) => ({
                        "role": "pending",
                        "fundraiserID": "pending",
                        "fundraiserName": role
                    }));
                    setUserRecord({
                        ... record.fields,
                        // "userRoles": roleList,
                        "roleInfo": roleInfo,
                    });
                    // console.log("record.fields: ", record.fields);
                    // console.log("roleInfo: ", roleInfo);
                });
                fetchNextPage();
            }, function done(err) {
                if (err) {
                    console.error(err);
                    return;
                }
            })
        }
    }, [isAuthenticated])


    //fleshes out userRecord's fundraisers with info from sellers & orders
    useEffect(() => {
        // fetches fundraisers from fundraisers table, updates fundraiserID & role
        if (userRecord.Email && !whichDataIsLoaded) {
            const fundraisersToGet = arrayify(userRecord.allFundraisers);
            base("Fundraisers")
            .select({
                filterByFormula: createFilterFormula(fundraisersToGet, "fundraiserName"),
                fields: getFundraiserFields(),
            })
            .eachPage(function page(records, fetchNextPage) {
                    records.map((fundraiser) => {
                        const { id, fields: { fundraiserName } } = fundraiser;
                        let allFundraiserFields = fundraiser.fields;
                        let usersRoleInThisFundraiser = getRecordType(id, userRecord);
                        let updatedRoleInfo = userRecord.roleInfo;
                        let indexOfThisFundraiserInUserRecordRoleInfo = () => userRecord.roleInfo.findIndex((fundraiser) => fundraiser["fundraiserName"] === fundraiserName);
                        updatedRoleInfo.splice(indexOfThisFundraiserInUserRecordRoleInfo(), 1, ({
                            ...updatedRoleInfo[indexOfThisFundraiserInUserRecordRoleInfo()],
                            "fundraiserID": id,
                            "role": usersRoleInThisFundraiser,
                            "fields": allFundraiserFields,
                        }));
                    })
                    fetchNextPage();
                }, function done(err) {
                    if (err) {
                        console.error(err); return
                    }
                    setWhichDataIsLoaded("fundraisers");
                });
        } else if (whichDataIsLoaded === "fundraisers") {
            userRecord.roleInfo.map((fundraiser, fundraiserIndex) => {
                const { role } = fundraiser;
                // gets seller records
                if (role !== "pending") {
                    const { fields: { sellerGuardians, sellers: allSellersInThisFundraiser } } = fundraiser;
                    const allUsersSellerIDs = userRecord["sellerRecords"];
                    console.log("sellerGuardians: ", sellerGuardians);
                    const sellersToGet = () => {
                        if (role === "seller" && allUsersSellerIDs) {
                                return createFilterFormula(allUsersSellerIDs, "recordID");
                        } else if (role === "organizer" && allSellersInThisFundraiser) {
                            return createFilterFormula(allSellersInThisFundraiser, "recordID");
                        } else if (role === "organizer" && !allSellersInThisFundraiser) {
                            return `IF({recordID} != "")`
                        } else {
                            return `IF({recordID} = "")`;
                        };
                    };
                    console.log("sellersToGet(): ", sellersToGet());
                    base("Sellers")
                    .select({
                        filterByFormula: sellersToGet(),
                        fields: getRoleSpecificSellerFields(role),
                    })
                    .eachPage(function page(sellerRecords, fetchNextPage) {
                            sellerRecords.forEach((seller, sellerIndex) => {
                                let updatedUserRecord = userRecord;
                                const { id, fields } = seller;
                                updatedUserRecord.roleInfo[fundraiserIndex]["fields"]["sellers"].splice(sellerIndex, 1, (
                                    {
                                        "id": id,
                                        "fields": fields,
                                    }
                                ))
                                setUserRecord({...updatedUserRecord});
                            })
                        fetchNextPage();
                    }, function done(err) {
                        if (err) {
                            console.error(err); return
                        }
                        setWhichDataIsLoaded("sellers");
                    });
                }
            })
            
        } else if (whichDataIsLoaded === "sellers") {
            userRecord.roleInfo.map((fundraiser, fundraiserIndex) => {
                const { role, fields: fundraiserFields } = fundraiser;
                if (role !== "pending") {
                    const { sellers } = fundraiserFields;
                    if (sellers) {
                        sellers.map((seller, sellerIndex)=> {
                            const { fields: sellerFields } = seller;
                            if (sellerFields) {
                                const { Orders: ordersToGet } = sellerFields;
                                const orderFilters = createFilterFormula(ordersToGet, "Order ID");
                                base("Orders")
                                    .select({
                                        filterByFormula: orderFilters,
                                        fields: getRoleSpecificOrderFields(role),
                                    })
                                    .eachPage(function page(orderRecords, fetchNextPage) {
                                        orderRecords.forEach((order, orderIndex) => {
                                            let updatedUserRecord = userRecord;
                                            const { id, fields } = order;
                                            updatedUserRecord
                                                .roleInfo
                                                [fundraiserIndex]
                                                ["fields"]
                                                ["sellers"]
                                                [sellerIndex]
                                                ["fields"]
                                                ["Orders"]
                                                    .splice(orderIndex, 1, (
                                                        {
                                                            "id": id,
                                                            "fields": fields,
                                                        }
                                                    ))
                                                setUserRecord({...updatedUserRecord});
                                        })
                                        fetchNextPage();
                                    }, function done(err) {
                                        if (err) {
                                            console.error(err); return
                                        }
                                        setWhichDataIsLoaded("orders");
                                    });
                            }
                        });
                    }
                }
            })
        }
    }, [userRecord, whichDataIsLoaded]);

    useEffect(() => {
        if (whichDataIsLoaded === "orders") {
            
        }
    }, [whichDataIsLoaded])

    return (<RecordsContext.Provider value={
        {recordsState, recordsDispatch}
    }>
        <Router basename={'/'}>
            <NavBar/> {/* {recordsState["drawerVisible"] &&
            <EditDrawer />
          }
        <Switch> 
          <Route exact path="/" render={props => <FundraisersPage fundraisers={fundraisers} {...props}/>} />
          <Route path="/calendar" render={props => fundraisers[0] && <FirehouseCalendar fundraisers={fundraisers} {...props} />}/>
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/orgView" component={OrganizerView} />
        </Switch> */}
            {/* {userRecord.id && <div>Here is the data: {JSON.stringify(userRecord)}</div>} */}
            {
            userRecord.roleInfo && <div>Here is the data: {
                JSON.stringify(userRecord.roleInfo)
            }</div>
        } </Router>
    </RecordsContext.Provider>);
}

export default withRouter(App);

// login page
// is registered user?
// no -- "denied" page
// yes -- find record in Users table. use linked fields to determine whether they have more than one role
// no -- add role-specific data to app state and display it on their "user home" page
// yes -- add role-specific data for all roles to app state, and redirect user to "choose fundraiser" page
// for provider user, displayed records are fundraisers
// for organizer, displayed records are orders and sellers and fundraiser details
// for seller guardians, displayed records are guardian's seller(s) and their orders and fundraiser details
// for sellers, displayed records are their own orders and fundraiser details
// display calendar view with role-specific data in /calendar route

// SellerFundraiser? ? add SellerFundraiser, fundraiser details, orders : don't
// GuardianFundraiser ? add SellerGuardianFundraiser, fundraiser details, seller w/ orders, other sellers w/ orthers : don't
// OrganizerFundraiser ? add OrganizerFundraiser, all sellers, all orders : don't
//
// };
