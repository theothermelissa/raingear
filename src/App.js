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
import {getFundraiserFields} from './components/getRecordsFunctions';
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
    
    // gets & save user's userRecord based on their email
    useEffect(() => {
        if (isAuthenticated && !userRecord) {
            base('Users').select({
                    filterByFormula: `{Email} = "${
                    user.email
                }"`
            }).eachPage(function page(records, fetchNextPage) {
                records.forEach(function (record) {
                    let roleList = arrayify(record.fields["userRoles"]);
                    let roleInfo = roleList.map((role) => ({"role": role, "fundraiserID": "pending"}));
                    setUserRecord({
                        ... record.fields,
                        "userRoles": roleList,
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


    // if they are a provider, retrieve and display all fundraisers in the Provider View

    //sets fundraisersToDisplay
    useEffect(() => {
        if (userRecord.Email) {
            const fundraisersToGet = arrayify(userRecord.allFundraisers);
            let createFilterFormula = (recordsList) => {
                let stringToReturn;
                let stringOpen = 'OR({fundraiserName}="';
                let stringClose = '")';
                let orSequence = recordsList.join('", {fundraiserName}="');
                stringToReturn = stringOpen + orSequence + stringClose;
                return stringToReturn;
            }
            base("Fundraisers")
            .select({
                filterByFormula: createFilterFormula(fundraisersToGet, "recordID"),
                fields: getFundraiserFields(),
            })
            .eachPage(function page(records, fetchNextPage) {
                //     // loop through user's fundraisers, save all data =>
                    // let dataToReturn;
                    records.map((record) => {
                        const { fields: { recordID: id } } = record;
                        let allFundraiserFields = record.fields;
                        let usersRoleInThisFundraiser = getRecordType(id, userRecord);
                        // console.log("usersRoleInThisFundraiser: ", usersRoleInThisFundraiser);
                        // let updatedRoleInfo = userRecord.roleInfo;
                        let indexOfThisFundraiserInUserRecordRoleInfo = () => userRecord.roleInfo.findIndex((fundraiser) => fundraiser.fundraiserID === id);
                        console.log("indexOfThisFundraiserInUserRecordRoleInfo(): ", indexOfThisFundraiserInUserRecordRoleInfo());
                        let indexOfThisFundraiserRole = () => userRecord.roleInfo.findIndex((record) => record.role === usersRoleInThisFundraiser);
                        userRecord.roleInfo.splice(indexOfThisFundraiserRole(), 1, ({
                            ...userRecord.roleInfo[indexOfThisFundraiserRole()],
                            "fundraiserID": record.fields.recordID,
                            "fields": allFundraiserFields,
                        }));
                        // setUserRecord(updatedRoleInfo);
                        // return dataToReturn;
                    })
                    fetchNextPage();
                }, function done(err) {
                    if (err) {
                        console.error(err); return
                    }
                    setWhichDataIsLoaded("fundraisers");
                });
        } 
    }, [userRecord]);

    useEffect(() => {
        if (userRecord.roleInfo) {
            if (whichDataIsLoaded === "fundraisers") {
                userRecord.roleInfo.map((fundraiser) => {
                    //

                    // if user is a seller, get this seller's seller record
                    // if user is an organizer, get all sellers' records
                    const { role, fundraiserID: id, fields: { sellers: allSellersInThisFundraiser} } = fundraiser;
                    const { organizerRecords, sellerRecords: thisUsersSellerRecords } = userRecord;
                    const sellersToGet = () => {
                        let result;
                        switch (role ) {
                            case "organizer": result = allSellersInThisFundraiser;
                                break;
                            case "seller": result = thisUsersSellerRecords;
                                break;
                            default: result = ("");
                        };
                        return result;
                    }
                    const filterFormula = createFilterFormula(sellersToGet(), "recordID");
                    base("Sellers").select({
                        filterByFormula: filterFormula
                    })
                    .eachPage(function page(records, fetchNextPage) {
                        records.forEach((record) => {
                            let allFields = record.fields;
                            console.log("allFields: ", allFields);
                            // let indexOfThisFundraiserRole = () => userRecord.roleInfo.findIndex((record) => record.role)
                        })
                        fetchNextPage();
                    }, function done(err) {
                        if (err) {
                            console.error(err); return;
                        }
                        // setWhichDataIsLoaded("sellers");
                    })
                })
            }
        }
    }, [whichDataIsLoaded, userRecord]);

    // useEffect(() => {
    //     if (userRecord.fields) {
    //         // console.log("whichDataIsLoaded: ", whichDataIsLoaded);
    //         if (!whichDataIsLoaded) {
    //             const fundraisersToGet = arrayify(userRecord.fields.allFundraisers);
    //             let createFilterFormula = (recordsList) => {
    //                 let stringToReturn;
    //                 let stringOpen = 'OR({fundraiserName}="';
    //                 let stringClose = '")';
    //                 let orSequence = recordsList.join('", {fundraiserName}="');
    //                 stringToReturn = stringOpen + orSequence + stringClose;
    //                 return stringToReturn;
    //             }
    //             let userRoleList = [];
    //             base("Fundraisers")
    //                 .select({
    //                     filterByFormula: createFilterFormula(fundraisersToGet),
    //                     // fields: getFundraiserFields(role),
    //                 })
    //                 .eachPage(function page(records, fetchNextPage) {
    //                     setFundraisers(records.map((record) => {
    //                         let fieldsToReturn;
    //                         let allFields = record.fields;
    //                         let role = getRecordType(record.fields.recordID, userRecord.fields);
    //                         userRoleList = addRecordToArray({"role": role, "fundraiser": allFields.recordID, }, userRoleList);
    //                         if (role === "organizer") {
    //                             fieldsToReturn = {
    //                                 "role": role,
    //                                 "fundraiserName": allFields.fundraiserName,
    //                                 "status": allFields.status,
    //                                 "organization": allFields.organization,
    //                                 "deliveryDate": allFields.deliveryDate,
    //                                 "deliveryAddress": allFields.deliveryAddress,
    //                                 "deliveryCity": allFields.deliveryCity,
    //                                 "deliveryState": allFields.deliveryState,
    //                                 "deliveryZip": allFields.deliveryZip,
    //                                 "deliveryNotes": allFields.deliveryNotes,
    //                                 "products": allFields.products,
    //                                 "customerButtPrice": allFields.customerButtPrice,
    //                                 "customerHamPrice": allFields.customerHamPrice,
    //                                 "customerTurkeyPrice": allFields.customerTurkeyPrice,
    //                                 "customerSaucePrice": allFields.customerSaucePrice,
    //                                 "orders": allFields.orders,
    //                                 "contactFirstName": allFields.contactFirstName,
    //                                 "contactLastName": allFields.contactLastName,
    //                                 "contactEmail": allFields.contactEmail,
    //                                 "contactPhone": allFields.contactPhone,
    //                                 "recordID": allFields.recordID,
    //                                 "sellers": allFields.sellers,
    //                                 "orderCount": allFields.orderCount,
    //                                 "inviteSellersURL": allFields.inviteSellersURL,
    //                                 "sellerGuardians": allFields.sellerGuardians,
    //                                 "buttCount": allFields.buttCount,
    //                                 "hamCount": allFields.hamCount,
    //                                 "turkeyCount": allFields.turkeyCount,
    //                                 "sauceCount": allFields.sauceCount,
    //                                 "organizationProceeds": allFields.organizationProceeds,
    //                             };
    //                         } if (role === "seller") {
    //                             fieldsToReturn = {
    //                                 "role": role,
    //                                 "fundraiserName": allFields.fundraiserName,
    //                                 "organization": allFields.organization,
    //                                 "deliveryDate": allFields.deliveryDate,
    //                                 "deliveryAddress": allFields.deliveryAddress,
    //                                 "deliveryCity": allFields.deliveryCity,
    //                                 "deliveryState": allFields.deliveryState,
    //                                 "deliveryZip": allFields.deliveryZip,
    //                                 "deliveryNotes": allFields.deliveryNotes,
    //                                 "products": allFields.products,
    //                                 "customerButtPrice": allFields.customerButtPrice,
    //                                 "customerHamPrice": allFields.customerHamPrice,
    //                                 "customerTurkeyPrice": allFields.customerTurkeyPrice,
    //                                 "customerSaucePrice": allFields.customerSaucePrice,
    //                                 "orders": allFields.orders,
    //                                 "contactFirstName": allFields.contactFirstName,
    //                                 "contactLastName": allFields.contactLastName,
    //                                 "contactEmail": allFields.contactEmail,
    //                                 "contactPhone": allFields.contactPhone,
    //                                 "recordID": allFields.recordID,
    //                                 "sellers": allFields.sellers,
    //                                 "orderCount": allFields.orderCount,
    //                                 "inviteSellersURL": allFields.inviteSellersURL,
    //                                 "sellerGuardians": allFields.sellerGuardians,
    //                                 "buttCount": allFields.buttCount,
    //                                 "hamCount": allFields.hamCount,
    //                                 "turkeyCount": allFields.turkeyCount,
    //                                 "sauceCount": allFields.sauceCount,
    //                                 "organizationProceeds": allFields.organizationProceeds,
    //                             };
    //                         }
    //                         return fieldsToReturn;
    //                     }));
    //                     fetchNextPage();
    //                 }, function done(err) {
    //                     if (err) {
    //                         console.error(err); return
    //                     }
    //                     setUserRoles(userRoleList);
    //                     setWhichDataIsLoaded("fundraisers");
    //                 });
    //         } 
            
    //         // if (whichDataIsLoaded === 'fundraisers') {
    //             // console.log("userRoles: ", userRoles);
    //             // let createFilterFormula = (recordsList) => {
    //             //     let stringToReturn;
    //             //     let stringOpen = 'OR({recordID}="';
    //             //     let stringClose = '")';
    //             //     let orSequence = recordsList.join('", {recordID}="');
    //             //     stringToReturn = stringOpen + orSequence + stringClose;
    //             //     return stringToReturn;
    //             // }
    //             // userRoles.map((fundraiser) => {
    //             //     const { role, fundraiser: id } = fundraiser;
    //             //     //if they are a seller in this fundraiser
    //             //     if (role === "seller") {
    //             //         if (whichDataIsLoaded === "fundraisers") {
    //             //             const sellersToGet = [... userRecord.fields["sellerRecords"]];
    //             //             base("Sellers")
    //             //                 .select({
    //             //                     filterByFormula: createFilterFormula(sellersToGet, "recordID"),
    //             //                 })
    //             //                 .eachPage(function page(records, fetchNextPage) {
    //             //                     records.forEach(function (record) {
    //             //                         let allFields = record.fields;
    //             //                         const thisFundraisersIndex = () => fundraisers.findIndex((fundraiser) => fundraiser.recordID === id);
    //             //                         let sellersIndex = fundraisers[thisFundraisersIndex()]["sellers"].indexOf(anyOfThese(sellersToGet));
    //             //                         let fundraiserToReplace = fundraisers[thisFundraisersIndex()];
    //             //                         let replaceFundraiserSellerData = () => {
    //             //                             let updatedSellerList = fundraiserToReplace["sellers"];
    //             //                             updatedSellerList.splice(sellersIndex, 1, allFields);
    //             //                             let newFundraiser = fundraiserToReplace;
    //             //                             newFundraiser["sellers"] = updatedSellerList;
    //             //                             return newFundraiser;
    //             //                         };
    //             //                         let replaceFundraiser = () => {
    //             //                             let newFundraiserList = fundraisers;
    //             //                             newFundraiserList.splice(thisFundraisersIndex, 1, replaceFundraiserSellerData());
    //             //                             return newFundraiserList;
    //             //                         };
    //             //                         setFundraisers(replaceFundraiser());
    //             //                     })
    //             //                     fetchNextPage();
    //             //                 }, function done(err) {
    //             //                     if (err) {
    //             //                         console.error(err); return
    //             //                     }
    //             //                     setWhichDataIsLoaded("sellers");
    //             //                 })
    //             //         } 
    //             //         if (whichDataIsLoaded === "sellers") {
    //             //             const ordersToGet = userRecord.fields;
    //             //             console.log("ordersToGet: ", ordersToGet);
    //             //         }
    //             //     }
    //             //     // if (role === "organizer") {
    //             //     //     console.log("This person works too hard.")
    //             //     // }
    //             // });
    //         // } 
    //     }
    // }, [userRecord, whichDataIsLoaded, userRoles]);

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
                JSON.stringify(userRecord)
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
