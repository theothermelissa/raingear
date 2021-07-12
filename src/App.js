import React, {useState, useEffect, useReducer} from 'react';
import Airtable from 'airtable';
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
import { getFundraisers } from './components/fetchFundraiserData';
import ProtectedRoute from './auth/protected-route';
import {useAuth0} from '@auth0/auth0-react';

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

    const {
        user,
        recordHasChanged,
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

    //set recordsState fundraiserToDisplay to first active fundraiser or, if provider, all fundraisers
    useEffect(() => {
        // let cancelled = false;
        // if (cancelled) { return }; 
        if (fundraisers) {
            const isProvider = record => record.role === 'provider';
            const isActive = record => record.fields.status === 'Active';
            let providerRecords = fundraisers.filter(isProvider);
            let activeRecords = fundraisers.filter(isActive);
            if (providerRecords.length) {
                recordsDispatch({
                    type: 'setFundraiserToDisplay',
                    payload: {
                        role: 'provider',
                        fundraisers: fundraisers
                    }
                })
            } else if (activeRecords.length) {
                recordsDispatch({
                    type: 'setFundraiserToDisplay',
                    payload: {
                        role: activeRecords[0]['role'],
                        fundraisers: activeRecords[0]
                    },
                })
            } else {
                recordsDispatch({
                    type: 'setFundraiserToDisplay',
                    payload: {
                        role: fundraisers[0]['role'],
                        fundraisers: fundraisers[0]
                    },
                })
            }
            setLoading(false);
        }
        // if (fundraisers) {
        //     console.log("fundraisers: ", fundraisers)
        //     fundraisers.map((fundraiser) => console.log('fundraiser: ', fundraiser))
        //     // function isProvider (record) {
        //     //     return record.role === 'provider';
        //     // };
        //     // console.log('test: ', isProvider(fundraisers[0]))
        //     // console.log('fundraisers.find(isProvider): ',fundraisers.find(isProvider));
        //     // console.log('test: ', [{id: 1, role: "potato"}, {id: 2, role:'provider'}].find(isProvider));
        //     // let isProvider = fundraisers.filter((fundraiser) => fundraiser.role === "provider");
        //     // if (isProvider.length) {
        //     //     recordsDispatch({
        //     //         type: 'setFundraiserToDisplay',
        //     //         payload: {
        //     //             role: "provider",
        //     //             fundraisers: fundraisers
        //     //         },
        //     //     })
        //     // } else {
        //     //     let activeFundraisers = fundraisers.filter((fundraiser) => fundraiser.fields.status === "Active");
        //     //     recordsDispatch({
        //     //         type: 'setFundraiserToDisplay',
        //     //         payload: activeFundraisers[0],
        //     //     });
        //     // }
        //     // setLoading(false);
        // };
    //   return () => cancelled = true;
    }, [fundraisers]);

    useEffect(() => {
        if (user.Email) {
            const {
                allFundraisers,
                roleInfo
            } = user;
            // console.log("fundraisers: ", fundraisers)
            const callbackForFetch = (result) => {
                setFundraisers(result);
            }
            getFundraisers(user, allFundraisers, callbackForFetch);
        }
    }, [user])
    
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
                </Router>
            </HighlightContext.Provider>
        </RecordsContext.Provider>
    );
}

export default withRouter(App);
