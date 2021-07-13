import React, {useState, useEffect, useReducer} from 'react';
import Airtable from 'airtable';
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import './App.scss';
import recordsReducer from './reducers/recordsReducer';
import highlightReducer from './reducers/highlightReducer';
import EditDrawer from './components/EditDrawer';
import FirehouseCalendar from './components/FirehouseCalendar';
import NavBar from './components/NavBar';
import {findIndex, matchesProperty} from 'lodash';
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
    
    // set user data by email
    useEffect(() => {
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

    // set fundraiserToDisplay
    useEffect(() => {
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
    }, [fundraisers]);

    // fetch fundraiser data
    useEffect(() => {
        if (user.Email) {
                const {
                    allFundraisers
                } = user;
                const callbackForFetch = (result) => {
                    setFundraisers(result);
                }
                getFundraisers(user, allFundraisers, callbackForFetch);
            }
    }, [user, recordsState.recordHasChanged])

    useEffect(() => {
        if (recordsState.recordHasChanged) {
            recordsDispatch({
                type: 'doNotUpdate'
            })
        }
    }, [recordsState])
    
    return (
        <RecordsContext.Provider value={{recordsState, recordsDispatch}}>
            <HighlightContext.Provider value={{highlightState, highlightDispatch}}>
                <Router basename={'/'}>
                    <NavBar/> 
                    {drawerVisible && <EditDrawer />}
                    <Switch>
                        {/* {!isAuthenticated && <div>Please log in.</div> } */}
                        {isAuthenticated && loading && <div>Loading ...</div>}
                        {!loading && <ProtectedRoute exact path="/" component={props => <HomePage {...props}/>} />}
                        {!loading && <Route path="/calendar" render={props => fundraisers && <FirehouseCalendar {...props} />}/>}
                        <ProtectedRoute path="/profile" component={Profile} />
                    </Switch>
                </Router>
            </HighlightContext.Provider>
        </RecordsContext.Provider>
    );
}

export default withRouter(App);
