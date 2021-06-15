import React, {useState, useEffect, useReducer} from 'react';
import Airtable from 'airtable';
import {notification} from 'antd';
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import './App.scss';
import recordsReducer from './reducers/recordsReducer';
import EditDrawer from './components/EditDrawer';
import FirehouseCalendar from './components/FirehouseCalendar';
import NavBar from './components/NavBar';
import {sortBy, find, matches, filter} from 'lodash';
import FundraisersPage from './components/FundraisersPage';
import Profile from './components/Profile';
import OrganizerView from './components/OrganizerView';
import ProviderView from './components/ProviderView';
import GuardianView from './components/GuardianView';
import HomePage from './components/HomePage';
import ProtectedRoute from './auth/protected-route';
import {useAuth0} from '@auth0/auth0-react';
import userEvent from '@testing-library/user-event';
import {
    getFundraiserFields,
    getRoleSpecificOrderFields,
    getRoleSpecificSellerFields
} from './components/getRecordsFunctions';
import {addRecordToArray} from './components/getRecordsFunctions';
import {chooseTable} from './components/getRecordsFunctions';
import {getRecordType} from './components/getRecordsFunctions';
import {arrayify} from './components/getRecordsFunctions';
import {anyOfThese} from './components/getRecordsFunctions';
import {createFilterFormula} from './components/getRecordsFunctions';
import {defaultGuardianRecord} from './components/getRecordsFunctions';
import { create, indexOf, update } from 'lodash';

export const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appWga5gfjEZX4q7X');
export const RecordsContext = React.createContext(null);
export const RecordsDispatch = React.createContext(null);

// get the data, save it to the recordsState (done)
// save the fundraiserToDisplay & userRole to the recordsState (I need the components to access the recordsState instead of receiving the fundraisers as props)
// display which version of the site based on the role (wait I need different versions)
// change the fundraiser in the menu (wait I need a menu)
// components render data
// profit

const initialState = {
    user: '',
    records: '',
    fundraiserToDisplay: '',
    viewFocusedRecord: false,
    focusedRecordID: '',
    drawerVisible: false,
    recordToEdit: '',
    alert: '',
    recordHasChanged: false,
    hoveredID: null,
    whichDataIsLoaded: '',
};

function App() {
    
    const {user, isAuthenticated} = useAuth0();
    const [loading, setLoading] = useState(true);
    const [recordsState, recordsDispatch] = useReducer(recordsReducer, initialState);
    const [userRecord, setUserRecord] = useState('');
    const [whichDataIsLoaded, setWhichDataIsLoaded] = useState('');
    const [fundraisers, setFundraisers] = useState('');
    const [totalRecordsToGet, setTotalRecordsToGet] = useState({
        fundraisers: 0,
        guardians: 0,
        sellers: 0,
        orders: 0
    });
    
    // get & save user's userRecord with fundraiserIDs using their email
    useEffect(() => {
        if (isAuthenticated && !userRecord) {
            base('Users').select({
                    filterByFormula: `{Email} = "${
                    user.email
                }"`
            }).eachPage(function page(records, fetchNextPage) {
                records.forEach(function (record) {
                    let fundraiserList = arrayify(record.fields["allFundraisers"])
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
                });
                fetchNextPage();
            }, function done(err) {
                if (err) {
                    console.error(err);
                    return;
                }
            })
        }
    }, [isAuthenticated, userRecord])


    //fetch fundraiser data for this user
    useEffect(() => {
        let cancelled = false;
        if (cancelled) {
            return;
        } else if (userRecord.Email) {
            let numberGuardians = 0;
            let numberSellers = 0;
            let numberOrders = 0;
            let retrievedFundraisers = 0;
            let retrievedGuardians = 0;
            let retrievedSellers = 0;
            let retrievedOrders = 0;
            const {
                sellerRecords: usersSellerRecords,
                guardianRecords: usersGuardianRecords,
                allFundraisers,
            } = userRecord;
            if (whichDataIsLoaded === "all") {
                setFundraisers([
                    ...userRecord.roleInfo,
                ]);
                return;
            } else if (!whichDataIsLoaded) {
                const fundraisersToGet = arrayify(allFundraisers);
                const numberOfFundraisers = fundraisersToGet.length;
                // setTotalRecordsToGet({
                //     ...totalRecordsToGet,
                //     fundraisers: fundraisersToGet.length,
                // });
                base("Fundraisers")
                .select({
                    filterByFormula: createFilterFormula(fundraisersToGet, "fundraiserName"),
                    fields: getFundraiserFields(),
                })
                .eachPage(function page(records, fetchNextPage) {
                    records.map((fundraiser) => {
                            const { 
                                id,
                                fields,
                                fields: { 
                                    orders: thisFundraisersOrders,
                                    sellers: thisFundraisersSellers,
                                    sellerGuardians: thisFundraisersGuardians,
                                    fundraiserName: fundraiserNameToMatch 
                                } 
                            } = fundraiser;
                            let usersRoleInThisFundraiser = getRecordType(id, userRecord);
                            let updatedRoleInfo = userRecord.roleInfo;
                            let indexOfThisFundraiserInUserRecordRoleInfo = () => {
                                return userRecord.roleInfo.findIndex((fundraiser) => {
                                    return fundraiser["fundraiserName"] === fundraiserNameToMatch;
                                })
                            };
                            updatedRoleInfo.splice(indexOfThisFundraiserInUserRecordRoleInfo(), 1, ({
                                ...updatedRoleInfo[indexOfThisFundraiserInUserRecordRoleInfo()],
                                "fundraiserID": id,
                                "role": usersRoleInThisFundraiser,
                                "fields": fields,
                            }));
                            retrievedFundraisers += 1;
                            })
                        fetchNextPage();
                    }, function done(err) {
                        if (err) {
                            console.error(err); return
                        }
                        if (numberOfFundraisers === retrievedFundraisers) {
                            setWhichDataIsLoaded("fundraisers");
                            recordsDispatch({
                                type: 'setDataLoaded',
                                payload: 'fundraisers'
                            })
                        }
                    });
            } else if (whichDataIsLoaded === "fundraisers") {
                userRecord.roleInfo.map((fundraiser, fundraiserIndex) => {
                    if (fundraiser.fields) {
                        const { role, fields: { sellerGuardians }} = fundraiser;
                        // gets guardian records from sellerGuardians table, saves it to userRecord
                        if (role !== "pending") {
                            let guardiansToGet;
                            if (usersGuardianRecords && sellerGuardians.includes(anyOfThese(usersGuardianRecords))) {
                                numberGuardians += 1;
                                guardiansToGet = createFilterFormula(usersGuardianRecords, "GuardianID")
                            } else {
                                numberGuardians += sellerGuardians.length;
                                guardiansToGet = createFilterFormula(sellerGuardians, "GuardianID");
                            }
                            // console.log("guardiansToGet: ", guardiansToGet);
                            base("SellerGuardians")
                            .select({
                                filterByFormula: guardiansToGet,
                            })
                            .eachPage(function page(guardianRecords, fetchNextPage) {
                                guardianRecords.forEach((guardian, guardianIndex) => {
                                    let updatedUserRecord = userRecord;
                                    const { id, fields, fields: { sellers } } = guardian;
                                    if (role === "guardian") {
                                        setTotalRecordsToGet({
                                            ...totalRecordsToGet,
                                            sellers: totalRecordsToGet.sellers + sellers
                                        })
                                    }
                                    updatedUserRecord.roleInfo[fundraiserIndex]["fields"]["sellerGuardians"].splice(guardianIndex, 1, (
                                        {
                                            "id": id,
                                            "fields": fields,
                                        }
                                    ))
                                    setUserRecord({...updatedUserRecord});
                                    retrievedGuardians += 1;
                                })
                                fetchNextPage();
                            }, function done(err) {
                                if (err) {
                                    console.error(err); return;
                                }
                                if (numberGuardians === retrievedGuardians) {
                                    setWhichDataIsLoaded("guardians");
                                    recordsDispatch({
                                        type: 'setDataLoaded',
                                        payload: 'guardians'
                                    })
                                }
                            })
                        }
                    }
                })
            } else if (whichDataIsLoaded === "guardians") {
                userRecord.roleInfo.map((fundraiser, fundraiserIndex) => {
                    const { role, fields: fundraiserFields } = fundraiser;
                    const { guardianRecords } = userRecord;
                    if (fundraiserFields) {
                        const { sellerGuardians } = fundraiserFields;
                        sellerGuardians.map((guardian, guardianIndex) => {
                            if (guardian['fields']) {
                                const { fields: { Sellers: guardiansSellers } } = guardian;
                                const sellersToGet = () => {
                                    if (role === "seller") {
                                        numberSellers += 1;
                                        return createFilterFormula(usersSellerRecords, "recordID");
                                    } else if (role === "organizer" && guardiansSellers) {
                                        numberSellers += guardiansSellers.length;
                                        return createFilterFormula(guardiansSellers, "recordID");
                                    } else if (role === "organizer" && !guardiansSellers) {
                                        return `IF({recordID} != "")`
                                    } else if (role === "guardian" && guardianRecords.includes(guardian.id)) {
                                        numberSellers += guardiansSellers.length;
                                        return createFilterFormula(guardiansSellers, "recordID");
                                    } else {
                                        return `IF({recordID} = "")`;
                                    };
                                };
                                base("Sellers")
                                .select({
                                    filterByFormula: sellersToGet(),
                                    fields: getRoleSpecificSellerFields(role),
                                })
                                .eachPage(function page(sellerRecords, fetchNextPage) {
                                        sellerRecords.forEach((seller, sellerIndex) => {
                                            let updatedUserRecord = userRecord;
                                            const { id, fields } = seller;
                                            updatedUserRecord.roleInfo
                                                [fundraiserIndex]
                                                ["fields"]
                                                ["sellerGuardians"]
                                                [guardianIndex]
                                                ["fields"]
                                                ["Sellers"]
                                            .splice(sellerIndex, 1, (
                                                {
                                                    "id": id,
                                                    "fields": fields,
                                                }
                                            ))
                                            setUserRecord({...updatedUserRecord});
                                            retrievedSellers += 1;
                                        })
                                    fetchNextPage();
                                }, function done(err) {
                                    if (err) {
                                        console.error(err); return
                                    }
                                    if (numberSellers === retrievedSellers) {
                                        setWhichDataIsLoaded("sellers");
                                        recordsDispatch({
                                            type: 'setDataLoaded',
                                            payload: 'sellers'
                                        })
                                    }
                                });
                            }
                        })
                    }
                })
            } else if (whichDataIsLoaded === "sellers") {
                userRecord.roleInfo.map((fundraiser, fundraiserIndex) => {
                    const { role } = fundraiser;
                    const { fields: fundraiserFields } = fundraiser;
                    if (fundraiserFields && fundraiserFields['sellerGuardians']) {
                        const { sellerGuardians } = fundraiserFields;
                        if (sellerGuardians.length) {
                            sellerGuardians.map((guardian, guardianIndex) => {
                                if (guardian.id) {
                                    const {fields: { Sellers: sellers }} = guardian;
                                    if (sellers) {
                                        sellers.map((seller, sellerIndex) => {
                                            if (seller["fields"]) {
                                                const { fields: { Orders: orders } } = seller;
                                                if (orders) {
                                                    numberOrders += orders.length;
                                                    base("Orders")
                                                    .select({
                                                        filterByFormula: createFilterFormula(orders, "Order ID"),
                                                        fields: getRoleSpecificOrderFields(role),
                                                    })
                                                    .eachPage(function page(orderRecords, fetchNextPage) {
                                                        orderRecords.forEach((order, orderIndex) => {
                                                            let updatedUserRecord = userRecord;
                                                            const { id, fields } = order;
                                                            updatedUserRecord.roleInfo
                                                                [fundraiserIndex]
                                                                ["fields"]
                                                                ["sellerGuardians"]
                                                                [guardianIndex]
                                                                ["fields"]
                                                                ["Sellers"]
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
                                                            retrievedOrders += 1;
                                                        })
                                                        fetchNextPage();
                                                    }, function done(err) {
                                                        if (err) {
                                                            console.error(err); return
                                                        }
                                                        if (numberOrders === retrievedOrders) {
                                                            setWhichDataIsLoaded("orders");
                                                            recordsDispatch({
                                                                type: 'setDataLoaded',
                                                                payload: 'orders'
                                                            })
                                                        }
                                                    })
                                                };
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            } else if (whichDataIsLoaded === "orders") {
                recordsDispatch({
                    type: "setRecords",
                    payload: [...userRecord.roleInfo]
                })
                setWhichDataIsLoaded("all");
                recordsDispatch({
                    type: 'setDataLoaded',
                    payload: 'all'
                })
            }
        }
        return () => {
            cancelled = true
        };
    }, [userRecord.Email, whichDataIsLoaded, ]);
  
    //set recordsState fundraiserToDisplay to first active fundraiser or, if provider, all fundraisers
    useEffect(() => {
        let cancelled = false;
        if (cancelled) return; 
        else if (fundraisers) {
            let isProvider = fundraisers.filter((fundraiser) => fundraiser.role === "provider");
            if (isProvider.length) {
                recordsDispatch({
                    type: 'setFundraiserToDisplay',
                    payload: fundraisers,
                })
            } else {
                let activeFundraisers = fundraisers.filter((fundraiser) => fundraiser.fields.status === "Active");
                recordsDispatch({
                    type: 'setFundraiserToDisplay',
                    payload: activeFundraisers[0],
                });
            }
            setLoading(false);
        };
      return () => cancelled = true;
    }, [fundraisers]);

    return (
        <RecordsContext.Provider value={{recordsState, recordsDispatch}}>
            <Router basename={'/'}>
                <NavBar/> 
                {/* {
                recordsState["drawerVisible"] &&
                <EditDrawer />
                } */}
                <Switch> 
                    {!isAuthenticated && <div>Please log in using the button at the top right.</div> }
                    {isAuthenticated && loading && <div>Loading ...</div>}
                    {/* <Route exact path="/" render={props => <FundraisersPage fundraisers={fundraisers} {...props}/>} /> */}
                    {!loading && <ProtectedRoute exact path="/" component={props => <HomePage {...props}/>} />}
                    {/* <Route path="/calendar" render={props => fundraisers[0] && <FirehouseCalendar fundraisers={fundraisers} {...props} />}/> */}
                    {/* <ProtectedRoute path="/profile" component={Profile} /> */}
                </Switch>
                {/* {userRecord.id && <div>Here is the data: {JSON.stringify(userRecord)}</div>} */}
            </Router>
        </RecordsContext.Provider>
    );
}

export default withRouter(App);
