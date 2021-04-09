import  React, { useState, useEffect, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
  } from "react-router-dom";
import './App.scss';
import FundraiserTimeline from './components/FundraiserTimeline';
import AllFundraisers from './components/AllFundraisers';
import EditFundraiser from './components/EditFundraiser';
import CreateFundraiserInquiry from './components/CreateFundraiserInquiry';
import Airtable from 'airtable';
import { Layout, Menu, Drawer, notification } from 'antd';
import { find, matchesProperty } from 'lodash';
import recordsReducer from './reducers/recordsReducer';
import FundraiserDetails from './components/FundraiserDetails';
import FirehouseCalendar from './components/FirehouseCalendar';
import Customers from './components/Customers';
import Team from './components/Team';
import Alerts from './components/Alerts';
import scrollIntoView from 'scroll-into-view';

const { Header, Content, Sider } = Layout;
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
  const [focusedFundraiser, setFocusedFundraiser] = useState('');
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
  
  useEffect( () => { 
    setFocusedFundraiser(
      find(fundraisers, matchesProperty('recordID', recordsState["focusedRecordID"])))
  }, [recordsState, fundraisers]);

  const setHovered = (id) => {
    recordsDispatch({
      type: 'setHovered',
     payload: id,
    })
  };

  const closeDrawer = () => recordsDispatch({
    type: "closeDrawer",
  });

  return (
    <RecordsContext.Provider
      value={{
        recordsState,
        recordsDispatch,
      }}
    >
      <Router>
          <Header 
            style={{ 
              position: "fixed",
              zIndex: 1000,
              width: '100%' 
            }}
          >
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1">
                  <NavLink to="/">
                    Home
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                  <NavLink to="/Customers">
                    Customers
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                  <NavLink to="/calendar">
                    Calendar
                  </NavLink>
                </Menu.Item>
            </Menu>
          </Header>
          <div style={{ height: "64px" }}>
          </div>
          {recordsState["drawerVisible"] && 
            <Drawer 
              forceRender
              width={"80vw"}
              visible={recordsState["drawerVisible"]}
              onClose={closeDrawer}
            >
              {recordsState["recordToEdit"] ?
                <EditFundraiser />
                :
                <CreateFundraiserInquiry fundraisers={fundraisers} />
              }
            </Drawer>
          }
        <Switch>
          <Route path="/" exact>
            <Layout>
              <Sider
                style={{
                  overflow: 'auto',
                  height: '100vh',
                  position: 'fixed',
                  left: 0,
                  backgroundColor: '#d9d9d9',
                }} 
                width="auto"
                className="site-layout-background"
              >
                {fundraisers[0] && 
                  <FundraiserTimeline
                    setHovered={setHovered}
                    fundraisers={fundraisers}
                  />
                }
              </Sider>
            </Layout>
            <Layout className="site-layout" style={{ marginLeft: 0 }}>
                <Content style={{ overflow: 'initial', minHeight: "100vh" }}>
                  {fundraisers[0] && 
                    <>
                      <AllFundraisers fundraisers={fundraisers} />
                      <div style={{ height: "300px" }}>
                      </div>
                    </>
                  }
                  {focusedFundraiser && <FundraiserDetails recordToDisplay={focusedFundraiser}/>}
                  <span style={{ height: "100px" }}/>
                </Content>
            </Layout>
          </Route>
          <Route path="/customers">
            <Layout className="site-layout">
              <Customers style={{marginTop: "200px", }} />
            </Layout>
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
