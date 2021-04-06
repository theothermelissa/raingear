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
  editDrawerVisible: false,
  recordToEdit: '',
  alert: '',
  recordHasChanged: false,
  hoveredID: null,
};

function App() {
  const [fundraisers, setFundraisers] = useState([]);
  // const [showAlert, setShowAlert] = useState(false);
  const [focusedFundraiser, setFocusedFundraiser] = useState('');
  const [recordsState, recordsDispatch] = useReducer(recordsReducer, initialState);
  // const [editDrawerVisible, setEditDrawerVisible] = useState(false);

  useEffect( () => { 
    // console.log("Hey! The record has changed!")
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
            // console.log("Records: ");
          });
        // recordsDispatch({
        //   type: "doNotUpdate",
        // });
        // recordsDispatch({
        //   type: "logSuccess",
        // });
        recordsDispatch({
          type: "recordChangeComplete",
        })
        // setShowAlert(true);
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

  // const dispatchFocusedRecord = (record) => recordsDispatch({
  //   type: 'chooseRecord',
  //   payload: record,
  //   }
  // );
//   const scrollParentToChild = (parent, child) => {
//     let parentRect = parent.getBoundingClientRect();
//       let parentHeight = parent.clientHeight;
//       let childRect = child.getBoundingClientRect();
//       let isViewable = (childRect.top >= parentRect.top) && (childRect.bottom <= parentRect.bottom);
//       console.log("parentHeight: ", parentHeight)
//       console.log("isViewable: ", isViewable)
//       if (!isViewable) {
//         parent.scrollTop = (child.top + parent.scrollTop) - parent.top
//       };
//   }

//   const scrollElementWithinPage = (page, element) => {
//     const pageBounding = page.getBoundingClientRect(),
//       clientBounding = element.getBoundingClientRect()

//     const pageBottom = pageBounding.bottom,
//       pageTop = pageBounding.top,
//       clientBottom = clientBounding.bottom,
//       clientTop = clientBounding.top;
    
//     if (pageTop >= clientTop) {
//       scrollTo(page, -(pageTop - clientTop), 300);
//     } else if (clientBottom > pageBottom) {
//       scrollTo(page, clientBottom - pageBottom, 300);
//     }
//   };

//   function scrollTo(element, to, duration) {
//     let start = element.scrollTop,
//       currentTime = 0,
//       increment = 20;
//     let animateScroll = function() {
//       currentTime += increment;
//     let val = easeInOutQuad(currentTime, start, to, duration);
//     element.scrollTop = val;
//     if (currentTime < duration) {
//         setTimeout(animateScroll, increment);
//       }
//     };
//     animateScroll();
//   }
// // Function for smooth scroll animation with the time duration
// function easeInOutQuad(time, startPos, endPos, duration) {
//   time /= duration / 2;
//   if (time < 1) return (endPos / 2) * time * time + startPos;
// time--;
//   return (-endPos / 2) * (time * (time - 2) - 1) + startPos;
// }
//   }

    // const scrollToRow = (scrollRow) => {
    //   scrollIntoView((scrollRow), {
    //     align: {
    //       top: 0,
    //       topOffset: 100,
    //     },
    //   });
    // }

  


  const setHovered = (id) => {
    // let hoveredRecord;
    // let fundraisersTable;
    // hoveredRecord = document.getElementById(`row${id}`);
    // fundraisersTable = document.getElementById("fundraisersTable");
    // if (hoveredRecord) {
    //   scrollToRow(hoveredRecord);
    // };
    recordsDispatch({
      type: 'setHovered',
     payload: id,
    })
  };

  const closeEditDrawer = () => recordsDispatch({
    type: "closeEditDrawer",
  });

  // function createFundraiserIndex(fundraiser) {
  //   fundraiser.values()
  // }

  // function createSearchFilter(fundraisers) {
  //   const fundraiserValues = values(fundraisers);
  //   console.log('fundraiserValues:', fundraiserValues);
  //   console.log(fundraisers)
  //   return (searchTerm) => {
  //     // some(fundraisers, searchTerm => includes(fundraisers, searchTerm))
      
  //   }
  // }

  // console.log('What we got from it: ', createSearchFilter(fundraisers));

  // const findMatchingFundraisersFor = createSearchFilter(fundraisers);

  
  // const selectFundraiser = (fundraiserSearchTerm) => {
    // const createFilterFor = (searchTerm) => fundraiser => some(fundraiser, searchTerm => includes(fundraiser, searchTerm));
    
    // console.log("fundraisers: ",fundraisers);
    // console.log("fundraiser: ", fundraiserSearchTerm);
    // const filteredFundraisers = filter(fundraisers, () => includesValue(fundraiserSearchTerm));
    // console.log("filteredFundraisers: ", filteredFundraisers);
    // console.log("includesValue: ", includesValue(fundraiserSearchTerm, fundraisers))
    // dispatchFocusedRecord(filter(fundraisers, includesValue(fundraiserSearchTerm, fundraisers)));
    // const selectedFundraiser = _(fundraisers).find(fundraiser);
  // }

  // console.log("recordsState: ", recordsState);


  return (
    <RecordsContext.Provider
      value={{
        recordsState,
        recordsDispatch,
      }}
    >
      <Router>
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1000, width: '100%' }}>
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
        </Layout>
        <Switch>
          <Route path="/" exact={true}>
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
                {fundraisers[0] && <FundraiserTimeline setHovered={setHovered} fundraisers={fundraisers} />}
              </Sider>
            </Layout>
            <Layout className="site-layout" style={{ marginLeft: 0 }}>
                <Content style={{ overflow: 'initial', minHeight: "100vh" }}>
                  {fundraisers[0] && <AllFundraisers fundraisers={fundraisers} />}
                  {focusedFundraiser && <FundraiserDetails recordToDisplay={focusedFundraiser}/>}
                  <span style={{ height: "100px" }}/>
                </Content>
                {/* {fundraisers[0] && <Button onClick={() => showEditDrawer(fundraisers[0]['rsecordID'])}>Show Drawer</Button>} */}
            </Layout>
            {recordsState["editDrawerVisible"] && <Drawer forceRender width={"80vw"} visible={recordsState["editDrawerVisible"]} onClose={closeEditDrawer}>
              <EditFundraiser />
            </Drawer>}
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
