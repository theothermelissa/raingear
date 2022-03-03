import React, { useState, useEffect, useReducer } from 'react';
import Airtable from 'airtable';
import { BrowserRouter as Router, Switch, withRouter } from "react-router-dom";
import './App.scss';
import recordsReducer from './reducers/recordsReducer';
import EditDrawer from './components/EditDrawer';
import FirehouseCalendar from './components/FirehouseCalendar';
import NavBar from './components/NavBar';
import { findIndex, matchesProperty, uniq } from 'lodash';
// import Profile from './components/Profile';
import HomePage from './components/HomePage';
import LoadingSpinner from './components/LoadingSpinner';
import { getFundraisers } from './components/fetchFundraiserData';
import ProtectedRoute from './auth/protected-route';
import { useAuth0 } from '@auth0/auth0-react';
import { getUser } from './components/fetchUserData';

export const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base('appWga5gfjEZX4q7X');
export const RecordsContext = React.createContext(null);
export const RecordsDispatch = React.createContext(null);


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

function App() {

    const { loginWithRedirect, user: auth0User, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(false);
    const [recordsState, recordsDispatch] = useReducer(recordsReducer, initialRecordsState);
    const [fundraisers, setFundraisers] = useState('');
    const [accessToken, setAccessToken] = useState('');


    const {
        user,
        recordHasChanged,
        drawerVisible,
    } = recordsState;




    // handle logging in
    const Login = ({ location }) => {

        const queryParams = () => {
            const params = new URLSearchParams(location.search);
            return {
                email: params.get("email"),
                mode: params.get('mode')
            }
        }

        const {
            email,
            mode
        } = queryParams()

        loginWithRedirect({
            login_hint: email,
            screen_hint: mode,
            // appState: {
            //     targetUrl: "/"
            // }
        })
    };

    // handle logging out
    useEffect(() => {

        if (recordsState.user === 'removed') {
            setLoading(false);
        }

    }, [recordsState.user])


    useEffect(() => {
        const getUserMetadata = async () => {

            if (!isAuthenticated) {
                return
            }

            try {
                const accessToken = await getAccessTokenSilently();

                setAccessToken(accessToken);

            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, isAuthenticated]);

    // set user data using email
    useEffect(() => {
        if (isAuthenticated && !user) {
            setLoading(true);
            const callbackForFetch = (result, err) => {
                if (err) {
                    recordsDispatch({
                        type: 'displayError',
                        payload: err
                    })
                    return;
                }
                recordsDispatch({
                    type: "setUser",
                    payload: result
                });
            }
            getUser(auth0User.email, callbackForFetch);
        }
    }, [isAuthenticated, user, auth0User, recordHasChanged])

    // fetch fundraiser data
    useEffect(() => {
        if (user.Email) {

            const {
                allFundraisers
            } = user;

            if (!fundraisers) {
                //get dem fundraisers
                const callbackForFetch = async (result) => {
                    let completeFundraisers = await result;
                    if (completeFundraisers) {
                        setFundraisers(completeFundraisers);
                    }
                }
                getFundraisers(user, allFundraisers, callbackForFetch)
            } else if (recordsState.recordHasChanged) {
                //get dat fundraisers
                setLoading(true);
                let fundraiserList = fundraisers;
                const changedFundraiserIndex = findIndex(fundraisers, matchesProperty('id', recordsState.recordToEdit))
                const callbackForFetch = async (result) => {
                    const updatedRecord = await result;
                    fundraiserList.splice(changedFundraiserIndex, 1, updatedRecord[0])
                    setFundraisers(fundraiserList);
                    setLoading(false);

                };
                getFundraisers(user, [fundraisers[changedFundraiserIndex]['id']], callbackForFetch);
                recordsDispatch({
                    type: 'doNotUpdate'
                })
            }
        }
    }, [user, fundraisers, recordsState.recordHasChanged, recordsState.recordToEdit])

    // set fundraiserToDisplay
    useEffect(() => {
        if (fundraisers.length) {
            recordsDispatch({
                type: 'setRecords',
                payload: fundraisers
            })
            const isAdmin = record => record.role === 'admin';
            const isProvider = record => record.role === 'provider';
            const isActive = record => record.fields.status === 'Active';
            let adminRecords = fundraisers.filter(isAdmin);
            let providerRecords = fundraisers.filter(isProvider);
            let activeRecords = fundraisers.filter(isActive);
            if (adminRecords.length) {
                recordsDispatch({
                    type: 'setFundraiserToDisplay',
                    payload: {
                        role: 'admin',
                        fundraisers: fundraisers
                    }
                })
                setLoading(false);
                return;
            } else if (providerRecords.length) {
                recordsDispatch({
                    type: 'setFundraiserToDisplay',
                    payload: {
                        role: 'provider',
                        fundraisers: fundraisers
                    }
                })
                setLoading(false);
                return;
            } else if (activeRecords.length) {
                recordsDispatch({
                    type: 'setFundraiserToDisplay',
                    payload: {
                        role: activeRecords[0]['role'],
                        fundraisers: activeRecords[0]
                    },
                })
                setLoading(false);
                return;
            } else {
                recordsDispatch({
                    type: 'setFundraiserToDisplay',
                    payload: {
                        role: fundraisers[0]['role'],
                        fundraisers: fundraisers[0]
                    },
                })
                setLoading(false);
            }
            setLoading(false);
        }
    }, [fundraisers]);

    return (
        <RecordsContext.Provider value={{ recordsState, recordsDispatch }}>
            <Router basename={'/'}>
                <NavBar />
                {drawerVisible && <EditDrawer />}
                <Switch>
                    <Login
                        exact
                        path="/login"
                        component={
                            props => <Login {...props} />
                        }
                    />
                    {recordsState.errorToDisplay
                        ? <div className='outer'>
                            {recordsState.errorToDisplay}
                        </div>
                        : !isAuthenticated && !loading && !recordsState.errorToDisplay &&
                        <div className='outer'>
                            <h2
                                style={{
                                    color: 'rgb(191, 191, 191)'
                                }}>
                                Login to see fundraiser information
                            </h2>
                        </div>
                    }
                    {loading && <LoadingSpinner />}
                    {!loading && <ProtectedRoute
                        exact
                        path="/"
                        component={
                            props => <HomePage {...props} />
                        }
                    />}
                    {!loading && <ProtectedRoute
                        path="/calendar"
                        component={props => <FirehouseCalendar {...props} />
                        }
                    // render={
                    //     props => fundraisers && <FirehouseCalendar {...props} />
                    // }
                    />}
                    {/* <ProtectedRoute path="/profile" component={Profile} /> */}
                </Switch>
            </Router>
        </RecordsContext.Provider>
    );
}

export default withRouter(App);
