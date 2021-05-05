import  React, { useState, useEffect, useReducer } from 'react';
import Airtable from 'airtable';
import { notification } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  } from "react-router-dom";
import './App.scss';
import recordsReducer from './reducers/recordsReducer';
import EditDrawer from './components/EditDrawer';
import FirehouseCalendar from './components/FirehouseCalendar';
import NavBar from './components/NavBar';
import FundraisersPage from './components/FundraisersPage';
import Profile from './components/Profile';
import OrganizerView from './components/OrganizerView';
import ProtectedRoute from './auth/protected-route';
import fetchTableData from './components/fetchTableData';

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
};



function App() {
  const [fundraisers, setFundraisers] = useState([]);
  const [recordsState, recordsDispatch] = useReducer(recordsReducer, initialState);

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

  fetchTableData("Users");
  
  useEffect( () => { 
    if (recordsState["recordHasChanged"]) {
      base('Fundraisers').select({
        view: "All Fields View",
        }).eachPage(function page(records, fetchNextPage) {
            setFundraisers(records.map(record => record.fields));
            fetchNextPage();
        }, function done(err) {
            if (err) {
              console.error(err);
              notification["error"]({
                message: 'Uh oh...',
                description: `Something went wrong :( \n ${err}`,
                placement: 'topLeft',
                duration: 0,
              });
              return;
            }
            notification["success"]({
              message: 'Success!',
              description: 'Saved the record',
              placement: 'topLeft',
              duration: 2,
            });
          });
        recordsDispatch({
          type: "recordChangeComplete",
        })
    } else if (!recordsState["focusedRecordID"]) {
      base('Fundraisers').select({
        view: "All Fields View",
        }).eachPage(function page(records, fetchNextPage) {
            setFundraisers(records.map(record => record.fields));
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }
  }, [recordsState]);

  return (
    <RecordsContext.Provider
      value={{
        recordsState,
        recordsDispatch,
      }}
    > 
      <Router basename={'/'}>
        <NavBar
        />
          {recordsState["drawerVisible"] && 
            <EditDrawer />
          }
        <Switch>
          <Route exact path="/" render={props => <FundraisersPage fundraisers={fundraisers} {...props}/>} />
          <Route path="/calendar" render={props => fundraisers[0] && <FirehouseCalendar fundraisers={fundraisers} {...props} />}/>
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/orgView" component={OrganizerView} />
        </Switch>
      </Router>
    </RecordsContext.Provider>
  );
}

export default withRouter(App);
