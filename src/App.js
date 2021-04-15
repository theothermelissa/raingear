import  React, { useState, useEffect, useReducer } from 'react';
import Airtable from 'airtable';
import { notification } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  } from "react-router-dom";
import './App.scss';
import recordsReducer from './reducers/recordsReducer';
import EditDrawer from './components/EditDrawer';
import FirehouseCalendar from './components/FirehouseCalendar';
import NavBar from './components/NavBar';
import FundraisersPage from './components/FundraisersPage';

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
};

function App() {
  const [fundraisers, setFundraisers] = useState([]);
  const [recordsState, recordsDispatch] = useReducer(recordsReducer, initialState);

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
        <NavBar />
          {recordsState["drawerVisible"] && 
            <EditDrawer />
          }
        <Switch>
          <Route path="/" exact>
            <FundraisersPage fundraisers={fundraisers}/>
          </Route>
          <Route path="/calendar">
            {fundraisers[0] && <FirehouseCalendar fundraisers={fundraisers} />}
          </Route>
        </Switch>
      </Router>
    </RecordsContext.Provider>
  );
}

export default App;
