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
import {defaultGuardianRecord} from './components/getRecordsFunctions';
import { create, indexOf, update } from 'lodash';

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
    user: '',
    fundraiserToDisplay: '',
    userRole: ''
};

function App() {
    
    const {user, isAuthenticated} = useAuth0();
    
    const [recordsState, recordsDispatch] = useReducer(recordsReducer, initialState);
    const [userRecord, setUserRecord] = useState('');
    const [whichDataIsLoaded, setWhichDataIsLoaded] = useState('');
    const [fundraisers, setFundraisers] = useState('');
    
    // get & save user's userRecord with fundraiserIDs using their email
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
        if (whichDataIsLoaded === "all") {
            return;
        } else if (userRecord.Email) {
            const {
                sellerRecords: usersSellerRecords,
                guardianRecords: usersGuardianRecords,
                organizerRecords: usersOrganizerRecords,
                providerRecords: usersProviderRecords,
                allFundraisers,
            } = userRecord;
            // fetches fundraiser data from Fundraisers table, saves to userRecord
            if (cancelled) {
                console.log("cancelled");
                return;
            };
            if (!whichDataIsLoaded) {
                const fundraisersToGet = arrayify(allFundraisers);
                base("Fundraisers")
                .select({
                    filterByFormula: createFilterFormula(fundraisersToGet, "fundraiserName"),
                    fields: getFundraiserFields(),
                })
                .eachPage(function page(records, fetchNextPage) {
                        records.map((fundraiser) => {
                            const { id, fields, fields: { fundraiserName: fundraiserNameToMatch } } = fundraiser;
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
                    if (fundraiser.fields) {
                        const { role, fields: { sellerGuardians: fundraisersSellerGuardians }} = fundraiser;
                        // gets guardian records from fundraisersSellerGuardians table, saves it to userRecord
                        if (role !== "pending") {
                            let guardiansToGet;
                            if (usersGuardianRecords && fundraisersSellerGuardians.includes(anyOfThese(usersGuardianRecords))) {
                                guardiansToGet = createFilterFormula(usersGuardianRecords, "GuardianID")
                            } else {
                                guardiansToGet = createFilterFormula(fundraisersSellerGuardians, "GuardianID");
                            }
                            base("SellerGuardians")
                            .select({
                                filterByFormula: guardiansToGet,
                            })
                            .eachPage(function page(guardianRecords, fetchNextPage) {
                                guardianRecords.forEach((guardian, guardianIndex) => {
                                    let updatedUserRecord = userRecord;
                                    const { id, fields } = guardian;
                                    updatedUserRecord.roleInfo[fundraiserIndex]["fields"]["sellerGuardians"].splice(guardianIndex, 1, (
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
                                    console.error(err); return;
                                }
                                setWhichDataIsLoaded("guardians")
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
                                            return createFilterFormula(usersSellerRecords, "recordID");
                                    } else if (role === "organizer" && guardiansSellers) {
                                        return createFilterFormula(guardiansSellers, "recordID");
                                    } else if (role === "organizer" && !guardiansSellers) {
                                        return `IF({recordID} != "")`
                                    } else if (role === "guardian" && guardianRecords.includes(guardian.id)) {
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
                                                        })
                                                        fetchNextPage();
                                                    }, function done(err) {
                                                        if (err) {
                                                            console.error(err); return
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
                setWhichDataIsLoaded("orders");
            } else if (whichDataIsLoaded === "orders") {
                const filterRecords = (role) => userRecord.roleInfo.filter((record) => record.role === role);
                // let organizerFundraisers = () => filterRecords("organizer") ? filterRecords("organizer") : '';
                // let sellerFundraisers = () => filterRecords("seller") ? filterRecords("seller") : '';
                // let guardianFundraisers = () => filterRecords("guardian") ? filterRecords("guardian") : '';
                // let providerFundraisers = () => filterRecords("provider") ? filterRecords("provider") : '';
                setFundraisers([
                    ...userRecord.roleInfo
                    // "organizerFundraisers": [...organizerFundraisers()],
                    // "sellerFundraisers": [...sellerFundraisers()],
                    // "providerFundraisers": [...providerFundraisers()],
                    // "guardianFundraisers": [...guardianFundraisers()],
                ]);
                setWhichDataIsLoaded("all");
            }
        }
        return () => {
            cancelled = true
        };
    }, [userRecord.Email, whichDataIsLoaded]);
   
  
    useEffect(() => {
        if (fundraisers) {
            let activeFundraisers = fundraisers.filter((fundraiser) => fundraiser.fields.status === "Active");
            console.log("activeFundraisers: ", activeFundraisers);
            recordsDispatch({
                type: 'setFundraiserToDisplay',
                payload: activeFundraisers[0],
            })
            // const firstActiveFundraiser = filter(fundraisers, matches({'status': 'Active'}));
            // const firstActiveFundraiser = find(fundraisers["fields"], matchesProperty("status", "Active"));
        };
      
    }, [fundraisers]);

    return (
        // if !loggedIn, "please log in"
        // if loading, "loading fundraiser data"
        // if user is provider, show Provider view
        // if user is organizer, show Organizer view
        // if user is guardian, show Guardian view
        <RecordsContext.Provider value={{recordsState, recordsDispatch}}>
            <Router basename={'/'}>
                <NavBar/> 
                {/* <div>Provider view goes here.</div>
                <div>Organizer view goes here.</div>
                <div>Guardian view goes here.</div>
                <div>Seller view goes here.</div> */}
                {/* {
                recordsState["drawerVisible"] &&
                <EditDrawer />
                } */}
                {
                    recordsState['fundraiserToDisplay'] && 
                        <div>Here is the data: 
                            {JSON.stringify(recordsState['fundraiserToDisplay'])}
                        </div>
                }
                {/* <Switch> 
                    <Route exact path="/" render={props => <FundraisersPage fundraisers={fundraisers} {...props}/>} />
                    <Route path="/calendar" render={props => fundraisers[0] && <FirehouseCalendar fundraisers={fundraisers} {...props} />}/>
                    <ProtectedRoute path="/profile" component={Profile} />
                    <ProtectedRoute path="/orgView" component={OrganizerView} />
                </Switch> */}
                {/* {userRecord.id && <div>Here is the data: {JSON.stringify(userRecord)}</div>} */}
            </Router>
        </RecordsContext.Provider>
    );
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
