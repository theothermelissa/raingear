import React, {useState, useEffect, useReducer} from 'react';
import Airtable from 'airtable';
// import {notification} from 'antd';
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import './App.scss';
import recordsReducer from './reducers/recordsReducer';
import highlightReducer from './reducers/highlightReducer';
import EditDrawer from './components/EditDrawer';
import FirehouseCalendar from './components/FirehouseCalendar';
import NavBar from './components/NavBar';
import {find, indexOf, result} from 'lodash';
import ProviderView from './components/ProviderView';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import { getFundraisers, getFundraiser, getGuardian, getSeller } from './components/fetchFundraiserData';
import ProtectedRoute from './auth/protected-route';
import {useAuth0} from '@auth0/auth0-react';
// import userEvent from '@testing-library/user-event';
import {
    getFundraiserFields,
    getRoleSpecificOrderFields,
    // getRoleSpecificSellerFields
} from './components/getRecordsFunctions';
// import {addRecordToArray} from './components/getRecordsFunctions';
// import {chooseTable} from './components/getRecordsFunctions';
import {getRecordType} from './components/getRecordsFunctions';
import {saveRecordInArray} from './components/getRecordsFunctions';
import {arrayify} from './components/getRecordsFunctions';
import {anyOfThese} from './components/getRecordsFunctions';
import {createFilterFormula} from './components/getRecordsFunctions';
// import { create, indexOf, update } from 'lodash';

export const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appWga5gfjEZX4q7X');
export const RecordsContext = React.createContext(null);
export const RecordsDispatch = React.createContext(null);
export const HighlightContext = React.createContext(null);
export const HighlightDispatch = React.createContext(null);

const initialRecordsState = {
    user: '',
    records: '',
    fundraiserToDisplay: '',
    viewFocusedRecord: false,
    focusedRecord: '',
    drawerVisible: false,
    recordToEdit: '',
    alert: '',
    recordHasChanged: false,
    hoveredIDs: null,
    whichDataIsLoaded: '',
    recordUpdated: '',
};

const initialHighlightState = {
    highlightedRecordIDs: null,
};

function App() {
    
    const {user: auth0User, isAuthenticated} = useAuth0();
    const [loading, setLoading] = useState(true);
    const [recordsState, recordsDispatch] = useReducer(recordsReducer, initialRecordsState);
    const [highlightState, highlightDispatch] = useReducer(highlightReducer, initialHighlightState);
    const [fundraisers, setFundraisers] = useState('');
    const [testFields, setTestFields] = useState([]);
    const [totalRecordsToGet, setTotalRecordsToGet] = useState({
        fundraisers: 0,
        guardians: 0,
        sellers: 0,
        orders: 0
    });

    const {
        user,
        recordHasChanged,
        whichDataIsLoaded,
        drawerVisible,
    } = recordsState;
    
    // get & save user's user with fundraiserIDs using their email
    useEffect(() => {
        // if (recordHasChanged) {
        //     console.log("the record has changed and we need to update something");
        //     const recordToReload = find(fundraisers, ['fundraiserID', recordUpdated])
        //     const fundraiserIndex = indexOf(fundraisers, recordToReload)
        //     console.log('fundraiserIndex: ', fundraiserIndex);
        //     // const fetchCompleteFundraiserData = () => {
        //     //     base("Fundraisers")
        //     //         .select
        //     // }
        //     //fetch complete fundraiser data
        // }
        if (isAuthenticated && !user) {
            base('Users').select({
                    filterByFormula: `{Email} = "${
                    auth0User.email
                }"`
            }).eachPage(function page(records, fetchNextPage) {
                records.forEach(function (record) {
                    let workingFundraiserList = record.fields["allFundraisers"]
                    let roleInfo = workingFundraiserList.map((id) => {
                        return ({
                            "role": "pending",
                            "fundraiserID": id,
                        })
                    });
                    recordsDispatch({
                        type: "setUser",
                        payload: {
                            ... record.fields,
                            "roleInfo": roleInfo,
                        }
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
    }, [isAuthenticated, user, recordHasChanged])


    useEffect(() => {
        if (user.Email) {
            const {
                allFundraisers,
                roleInfo
            } = user;
            const callbackForFetch = (result) => {
                setFundraisers(result);
            }
            getFundraisers(user, allFundraisers, callbackForFetch);
        }
    }, [user])
    
    // fetch fundraiser data for this user
    // useEffect(() => {
    //     let cancelled = false;
    //     if (cancelled) {
    //         return;
    //     } else if (user.Email) {
    //         // let numberGuardians = 0;
    //         // let numberSellers = 0;
    //         // let numberOrders = 0;
    //         // let retrievedFundraisers = 0;
    //         // let retrievedGuardians = 0;
    //         // let retrievedSellers = 0;
    //         // let retrievedOrders = 0;
    //         const {
    //             sellerRecords: usersSellerRecords,
    //             guardianRecords: usersGuardianRecords,
    //             allFundraisers,
    //             roleInfo
    //         } = user;
    //         let numberOfFundraisers = allFundraisers.length;
    //         let workingFundraiserList = [];
    //         if (whichDataIsLoaded.step === "all") {
    //             setFundraisers([
    //                 ...roleInfo,
    //             ]);
    //             return;
    //         } else if (!whichDataIsLoaded) {
    //             const fundraisersToGet = allFundraisers;
    //             // let roleInfo = user.roleInfo;
                
                
    //             fundraisersToGet.map((fundraiserIDToFetch, index) => {
    //                 const usersRoleInThisFundraiser = getRecordType(fundraiserIDToFetch, user);
                    
    //                 const callbackForFetch = (result) => {
    //                     workingFundraiserList.push({
    //                         "role": usersRoleInThisFundraiser,
    //                         ... result
    //                     });
    //                     if (workingFundraiserList.length === numberOfFundraisers) {
    //                         recordsDispatch({
    //                             type: 'setDataLoaded',
    //                             payload: {
    //                                 step: 'fundraisers',
    //                                 data: workingFundraiserList,
    //                             }
    //                         })
    //                     }
    //                     // console.log("result: ", result);
    //                     // roleInfo.splice(index, 1, ({
    //                     //     ... result,
    //                     //     "role": usersRoleInThisFundraiser,
    //                     // }))
    //                 };
    //                 // const callbackForFetch = (response) => setTestFields([...testFields, response]);
    //                 getFundraiser(fundraiserIDToFetch, callbackForFetch);
                    
    //                 // getFundraiserFields(fundraiserIDToFetch)
    //                     // .then(setTestFields(getFundraiserFields(fundraiserIDToFetch)));
    //                 // roleInfo.splice(index, 1, ({
    //                 //     role: usersRoleInThisFundraiser,
    //                 //     id: fundraiserIDToFetch,
    //                 //     fields: getFundraiser(fundraiserIDToFetch)
    //                 // }))

    //                 // let fundraiserFields;

    //                 // const callbackForFetch = (result) => fundraiserFields = result;
    //                 // console.log("getFundraiser(fundraiserIDToFetch, callbackForFetch): ", getFundraiser(fundraiserIDToFetch, callbackForFetch));
    //                 // getFundraiser(fundraiserIDToFetch, callbackForFetch);
    //                 // console.log('fundraiserFields: ', fundraiserFields);

                    
    //                 // const callbackForFetch = (result) => {
    //                 //     roleInfo.splice(index, 1, (
    //                 //         result
    //                 //     ));
    //                 // };
                    
    //                 // const propsForFetch = {
    //                 //     idOfFundraiser: fundraiserIDToFetch,
    //                 //     callback: callbackForFetch,
    //                 //     usersRole: usersRoleInThisFundraiser,
    //                 // }
    //                 // getFundraiser(propsForFetch);
    //                 // getFundraiser(propsForFetch);
    //                 // roleInfo.splice(index, 1, (
    //                 //     getFundraiser(propsForFetch)
    //                 // ));
    //                 // console.log("numberOfFundraisers: ", numberOfFundraisers)
                    
    //             });
    //             // setTestFields(roleInfo);
    //         } else if (whichDataIsLoaded.step === "fundraisers") {
    //             const { data } = whichDataIsLoaded;
    //             const numberOfFundraisers = data.length;
    //             let retrievedFundraisers = 0;
    //             data.map((fundraiser, index) => {
    //                 let workingGuardianList = [];
    //                 const { fields: {sellerGuardians} } = fundraiser;
    //                 const numberGuardians = sellerGuardians.length;
    //                 // console.log("numberGuardians: ", numberGuardians);
    //                 const callbackForFetch = (id, guardianIndex, result) => {
    //                     workingGuardianList.push({id, fields: result});
    //                     // console.log("workingGuardianList: ", workingGuardianList)
    //                     if (workingGuardianList.length === numberGuardians ) {
    //                         data[index]['fields']['sellerGuardians'] = workingGuardianList;
    //                     }
    //                 }
    //                 if (sellerGuardians) {
    //                     sellerGuardians.map((guardianID, guardianIndex) => {
    //                         getGuardian(guardianID, guardianIndex, callbackForFetch);
    //                     }).then()
    //                 }
    //                 retrievedFundraisers += 1;
    //             }).then( () => 
    //                 recordsDispatch({
    //                     type: 'setDataLoaded',
    //                     payload: {
    //                         dataWithGuardians: data,
    //                         step: 'guardians',
    //                     }
    //                 })
    //             )
    //             // data.map((record) => {
    //             //     console.log('record: ', record)
    //             // })
    //             // data.map((fundraiser) => {
                    
    //             // })
    //             // user.roleInfo.map((fundraiser, fundraiserIndex) => {
    //             //     if (fundraiser.fields) {
    //             //         const { role, fields: { sellerGuardians }} = fundraiser;
    //             //         // gets guardian records from sellerGuardians table, saves it to user
    //             //         if (role !== "pending") {
    //             //             let guardiansToGet;
    //             //             if (usersGuardianRecords && sellerGuardians && sellerGuardians.includes(anyOfThese(usersGuardianRecords))) {
    //             //                 numberGuardians += 1;
    //             //                 guardiansToGet = createFilterFormula(usersGuardianRecords, "GuardianID")
    //             //             } else if (sellerGuardians) {
    //             //                 numberGuardians += sellerGuardians.length;
    //             //                 guardiansToGet = createFilterFormula(sellerGuardians, "GuardianID");
    //             //             } else {
    //             //                 guardiansToGet = `IF({GuardianID} != "")`;
    //             //             }
    //             //             base("SellerGuardians")
    //             //             .select({
    //             //                 filterByFormula: guardiansToGet,
    //             //             })
    //             //             .eachPage(function page(guardianRecords, fetchNextPage) {
    //             //                 guardianRecords.forEach((guardian, guardianIndex) => {
    //             //                     let updatedUser = user;
    //             //                     const { id, fields, fields: { sellers } } = guardian;
    //             //                     if (role === "guardian") {
    //             //                         setTotalRecordsToGet({
    //             //                             ...totalRecordsToGet,
    //             //                             sellers: totalRecordsToGet.sellers + sellers
    //             //                         })
    //             //                     }
    //             //                     updatedUser.roleInfo[fundraiserIndex]["fields"]["sellerGuardians"].splice(guardianIndex, 1, (
    //             //                         {
    //             //                             "id": id,
    //             //                             "fields": fields,
    //             //                         }
    //             //                     ))
    //             //                     recordsDispatch({
    //             //                         type: 'setUser',
    //             //                         payload: {...updatedUser}
    //             //                     })
    //             //                     retrievedGuardians += 1;
    //             //                 })
    //             //                 fetchNextPage();
    //             //             }, function done(err) {
    //             //                 if (err) {
    //             //                     console.error(err); return;
    //             //                 }
    //             //                 if (numberGuardians === retrievedGuardians) {
    //             //                     // setWhichDataIsLoaded.step("guardians");
    //             //                     recordsDispatch({
    //             //                         type: 'setDataLoaded',
    //             //                         payload: 'guardians'
    //             //                     })
    //             //                 }
    //             //             })
    //             //         }
    //             //     }
    //             // })
    //         } else if (whichDataIsLoaded.step === 'guardians' && whichDataIsLoaded.dataWithGuardians) {
    //             const { dataWithGuardians } = whichDataIsLoaded;
    //             dataWithGuardians.map((fundraiser, fundraiserIndex) => {
    //                 const {
    //                     fields: {sellerGuardians, fundraiserName}
    //                 } = fundraiser;
    //                 if (sellerGuardians) {sellerGuardians.map((guardian, guardianIndex) => {
    //                     console.log("guardian: ", guardian);
    //                     // const { fields: {Sellers: sellers} } = guardian;
    //                     // console.log("sellers: ", sellers)
    //                     // let workingSellerList = [];
    //                     // let numberSellers = sellers.length;
    //                     // const callbackForFetch = (id, response) => {
    //                     //     workingSellerList.push(id, result);
    //                     //     data[fundraiserIndex]["fields"]['sellerGuardians'][guardianIndex].splice(0, numberSellers, ({
    //                     //         id: id,
    //                     //         fields: response,
    //                     //     }));
    //                     //     if (workingSellerList === numberSellers) {
    //                     //         console.log("dispatching record: ", id);
    //                     //         recordsDispatch({
    //                     //             type: 'setDataLoaded',
    //                     //             payload: ({
    //                     //                 step: 'sellers',
    //                     //                 data: data,
    //                     //             })
    //                     //         })
    //                     //     }
    //                     // }
    //                     // if (sellers) {
    //                     //     sellers.map((sellerID) => {
    //                     //         getSeller(sellerID, callbackForFetch);
    //                     //     })
    //                     // }
    //                 })}
    //             })
    //         // } else if (whichDataIsLoaded === "guardians") {
    //         //     user.roleInfo.map((fundraiser, fundraiserIndex) => {
    //         //         const { role, fields: fundraiserFields } = fundraiser;
    //         //         const { guardianRecords } = user;
    //         //         if (fundraiserFields) {
    //         //             const { sellerGuardians } = fundraiserFields;
    //         //             if (sellerGuardians) {
    //         //                 sellerGuardians.map((guardian, guardianIndex) => {
    //         //                     if (guardian['fields']) {
    //         //                         const { fields: { Sellers: guardiansSellers } } = guardian;
    //         //                         const sellersToGet = () => {
    //         //                             if (role.role) {
    //         //                                 numberSellers += 1;
    //         //                                 return createFilterFormula(usersSellerRecords, "recordID");
    //         //                             } else if (role === "organizer" && guardiansSellers) {
    //         //                                 numberSellers += guardiansSellers.length;
    //         //                                 return createFilterFormula(guardiansSellers, "recordID");
    //         //                             } else if (role === "organizer" && !guardiansSellers) {
    //         //                                 return `IF({recordID} != "")`
    //         //                             } else if (role === "guardian" && guardianRecords.includes(guardian.id)) {
    //         //                                 numberSellers += guardiansSellers.length;
    //         //                                 return createFilterFormula(guardiansSellers, "recordID");
    //         //                             } else {
    //         //                                 numberSellers += guardiansSellers.length
    //         //                                 return createFilterFormula(guardiansSellers, 'recordID');
    //         //                             };
    //         //                         };
    //         //                         base("Sellers")
    //         //                         .select({
    //         //                             filterByFormula: sellersToGet(),
    //         //                             // fields: getRoleSpecificSellerFields(role.role ? "seller" : role),
    //         //                         })
    //         //                         .eachPage(function page(sellerRecords, fetchNextPage) {
    //         //                             sellerRecords.forEach((seller, sellerIndex) => {
    //         //                                     let updatedUser = user;
    //         //                                     const { id, fields } = seller;
    //         //                                     updatedUser.roleInfo
    //         //                                         [fundraiserIndex]
    //         //                                         ["fields"]
    //         //                                         ["sellerGuardians"]
    //         //                                         [guardianIndex]
    //         //                                         ["fields"]
    //         //                                         ["Sellers"]
    //         //                                     .splice(sellerIndex, 1, (
    //         //                                         {
    //         //                                             "id": id,
    //         //                                             "fields": fields,
    //         //                                         }
    //         //                                     ))
    //         //                                     recordsDispatch({
    //         //                                         type: 'setUser',
    //         //                                         payload: {...updatedUser}
    //         //                                     })
    //         //                                     retrievedSellers += 1;
    //         //                                 })
    //         //                             fetchNextPage();
    //         //                         }, function done(err) {
    //         //                             if (err) {
    //         //                                 console.error(err); return
    //         //                             }
    //         //                             if (numberSellers === retrievedSellers) {
    //         //                                 // setWhichDataIsLoaded("sellers");
    //         //                                 recordsDispatch({
    //         //                                     type: 'setDataLoaded',
    //         //                                     payload: 'sellers'
    //         //                                 })
    //         //                             }
    //         //                         });
    //         //                 }
    //         //                 })
    //         //             // } else {
    //         //             //     setWhichDataIsLoaded("sellers");
    //         //             //     recordsDispatch({
    //         //             //         type: 'setDataLoaded',
    //         //             //         payload: 'sellers'
    //         //             //     })
    //         //             }
    //         //         }
    //         //     })
    //         // } else if (whichDataIsLoaded === "sellers") {
    //         //     user.roleInfo.map((fundraiser, fundraiserIndex) => {
    //         //         const { role } = fundraiser;
    //         //         const { fields: fundraiserFields } = fundraiser;
    //         //         if (fundraiserFields && fundraiserFields['sellerGuardians']) {
    //         //             const { sellerGuardians } = fundraiserFields;
    //         //             if (sellerGuardians.length) {
    //         //                 sellerGuardians.map((guardian, guardianIndex) => {
    //         //                     if (guardian.id) {
    //         //                         const {fields: { Sellers: sellers }} = guardian;
    //         //                         if (sellers) {
    //         //                             sellers.map((seller, sellerIndex) => {
    //         //                                 if (seller["fields"]) {
    //         //                                     const { fields: { Orders: orders } } = seller;
    //         //                                     if (orders) {
    //         //                                         numberOrders += orders.length;
    //         //                                         base("Orders")
    //         //                                         .select({
    //         //                                             filterByFormula: createFilterFormula(orders, "Order ID"),
    //         //                                             fields: getRoleSpecificOrderFields(role.role ? "seller" : role),
    //         //                                         })
    //         //                                         .eachPage(function page(orderRecords, fetchNextPage) {
    //         //                                             orderRecords.forEach((order, orderIndex) => {
    //         //                                                 let updatedUser = user;
    //         //                                                 const { id, fields } = order;
    //         //                                                 updatedUser.roleInfo
    //         //                                                     [fundraiserIndex]
    //         //                                                     ["fields"]
    //         //                                                     ["sellerGuardians"]
    //         //                                                     [guardianIndex]
    //         //                                                     ["fields"]
    //         //                                                     ["Sellers"]
    //         //                                                     [sellerIndex]
    //         //                                                     ["fields"]
    //         //                                                     ["Orders"]
    //         //                                                     .splice(orderIndex, 1, (
    //         //                                                         {
    //         //                                                             "id": id,
    //         //                                                             "fields": fields,
    //         //                                                         }
    //         //                                                     ))
    //         //                                                 recordsDispatch({
    //         //                                                     type: 'setUser',
    //         //                                                     payload: {...updatedUser}
    //         //                                                 });
    //         //                                                 retrievedOrders += 1;
    //         //                                             })
    //         //                                             fetchNextPage();
    //         //                                         }, function done(err) {
    //         //                                             if (err) {
    //         //                                                 console.error(err); return
    //         //                                             }
    //         //                                             if (numberOrders === retrievedOrders) {
    //         //                                                 // setWhichDataIsLoaded("orders");
    //         //                                                 recordsDispatch({
    //         //                                                     type: 'setDataLoaded',
    //         //                                                     payload: 'orders'
    //         //                                                 })
    //         //                                             }
    //         //                                         })
    //         //                                     };
    //         //                                 }
    //         //                             })
    //         //                         }
    //         //                     }
    //         //                 })
    //         //             }
    //         //         }
    //         //     })
    //         // } else if (whichDataIsLoaded === "orders") {
    //         //     recordsDispatch({
    //         //         type: "setRecords",
    //         //         payload: [...user.roleInfo]
    //         //     })
    //         //     // setWhichDataIsLoaded("all");
    //         //     recordsDispatch({
    //         //         type: 'setDataLoaded',
    //         //         payload: 'all'
    //         //     })
    //         }
    //     }
    //     return () => {
    //         cancelled = true
    //     };
    // }, [user.Email, whichDataIsLoaded, recordHasChanged]);
  
    //set recordsState fundraiserToDisplay to first active fundraiser or, if provider, all fundraisers
    useEffect(() => {
        let cancelled = false;
        if (cancelled) { return }; 
        if (fundraisers) {
            console.log('trying to map this bitch')
            fundraisers.map(() => {
                console.log('foo')
            })
            // let isProvider = fundraisers.filter((fundraiser) => fundraiser.role === "provider");
            // if (isProvider.length) {
            //     recordsDispatch({
            //         type: 'setFundraiserToDisplay',
            //         payload: {
            //             role: "provider",
            //             fundraisers: fundraisers
            //         },
            //     })
            // } else {
            //     let activeFundraisers = fundraisers.filter((fundraiser) => fundraiser.fields.status === "Active");
            //     recordsDispatch({
            //         type: 'setFundraiserToDisplay',
            //         payload: activeFundraisers[0],
            //     });
            // }
            // setLoading(false);
        };
      return () => cancelled = true;
    }, [fundraisers, recordHasChanged]);

    return (
        <RecordsContext.Provider value={{recordsState, recordsDispatch}}>
            <HighlightContext.Provider value={{highlightState, highlightDispatch}}>
                <Router basename={'/'}>
                    <NavBar/> 
                    {drawerVisible && <EditDrawer />}
                    <Switch>
                        {!isAuthenticated && <div>Please log in.</div> }
                        {isAuthenticated && loading && <div>Loading ...</div>}
                        <Route exact path="/" render={props => <ProviderView fundraisers={fundraisers} {...props}/>} />
                        {!loading && <ProtectedRoute exact path="/" component={props => <HomePage {...props}/>} />}
                        <Route path="/calendar" render={props => fundraisers && <FirehouseCalendar {...props} />}/>
                        <ProtectedRoute path="/profile" component={Profile} />
                    </Switch>
                    {fundraisers && <div>Here is the data: {JSON.stringify(fundraisers)}</div>}
                </Router>
            </HighlightContext.Provider>
        </RecordsContext.Provider>
    );
}

export default withRouter(App);
