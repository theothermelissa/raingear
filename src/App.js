import  React, { useState, useEffect, useReducer } from 'react';
import './App.scss';
import FundraiserTimeline from './components/FundraiserTimeline';
import AllFundraisers from './components/AllFundraisers';
import EditFundraiser from './components/EditFundraiser';
import Airtable from 'airtable';
import { Layout, Menu, Drawer } from 'antd';
import { find, matchesProperty } from 'lodash';
import recordsReducer from './reducers/recordsReducer';
import FundraiserDetails from './components/FundraiserDetails';
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
  const [showAlert, setShowAlert] = useState(false);
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
            if (err) { console.error(err); return; }
        });
        recordsDispatch({
          type: "logSuccess",
        });
        recordsDispatch({
          type: "doNotUpdate",
        });
        setShowAlert(true);
    } else if (!recordsState["focusedRecordID"]) {
      base('Fundraisers').select({
        view: "All Fields View",
        }).eachPage(function page(records, fetchNextPage) {
            setFundraisers(records.map(record => record.fields));
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    } else {
      return null;
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
  // const scrollParentToChild= (parent, child) => {
  //   let parentRect = parent.getBoundingClientRect();
  //     let parentHeight = parent.clientHeight;
  //     let childRect = child.getBoundingClientRect();
  //     let isViewable = (childRect.top >= parentRect.top) && (childRect.bottom <= parentRect.bottom);
  //     console.log("parentHeight: ", parentHeight)
  //     console.log("isViewable: ", isViewable)
  //     if (!isViewable) {
  //       parent.scrollTop = (child.top + parent.scrollTop) - parent.top
  //     };
  // }

    const scrollToRow = (scrollRow) => {
      scrollIntoView((scrollRow), {
        align: {
          top: 0,
          topOffset: 100,
        },
      });
    }


  const setHovered = (id) => {
    let hoveredRecord;
    // let fundraisersTable;
    hoveredRecord = document.getElementById(`row${id}`);
    // fundraisersTable = document.getElementById("fundraisersTable");
    if (hoveredRecord) {
      scrollToRow(hoveredRecord);
    };
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
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1000, width: '100%' }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[2]}>
            <Menu.Item key="1">Fundraisers</Menu.Item>
            <Menu.Item key="2">Customers</Menu.Item>
            <Menu.Item key="3">Team</Menu.Item>
          </Menu>
        {recordsState["alert"] && <Alerts />}
        </Header>
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
            <FundraiserTimeline setHovered={setHovered} fundraisers={fundraisers} />
          </Sider>
        </Layout>
        <Layout className="site-layout" style={{ marginLeft: 0 }}>
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ overflow: 'initial', minHeight: "100vh" }}>
              <AllFundraisers fundraisers={fundraisers} />
              {focusedFundraiser && <FundraiserDetails recordToDisplay={focusedFundraiser}/>}
            </Content>
            {/* {fundraisers[0] && <Button onClick={() => showEditDrawer(fundraisers[0]['rsecordID'])}>Show Drawer</Button>} */}
        </Layout>
      </Layout>
          <Drawer width={"80vw"} visible={recordsState["editDrawerVisible"]} onClose={closeEditDrawer}>
            <EditFundraiser />
          </Drawer>
    </RecordsContext.Provider>
    
  );
}

export default App;
