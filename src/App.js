import  React, { useState, useEffect, useReducer } from 'react';
import './App.scss';
import FundraiserTimeline from './components/FundraiserTimeline';
import AllFundraisers from './components/AllFundraisers';
import Airtable from 'airtable';
import { format, compareAsc } from 'date-fns';
import { Layout, Menu, Breadcrumb } from 'antd';
import { some, includes, filter, values, create, find, matchesProperty } from 'lodash';
import recordsReducer from './reducers/recordsReducer';
import FundraiserDetails from './components/FundraiserDetails';

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appWga5gfjEZX4q7X');

const { Header, Content, Sider } = Layout;
export const RecordsContext = React.createContext(null);
export const RecordsDispatch = React.createContext(null);

const initialState = {
  focusedRecord: null,
  viewFocusedRecord: false,
  alerts: [],
  newRecord: false,
  hoveredID: null,
};

function App() {
  const [fundraisers, setFundraisers] = useState([]);
  const [recordsState, recordsDispatch] = useReducer(recordsReducer, initialState);
  // const [fundraiserState, fundraiserStateDispatch] = useReducer(recordsReducer, initialState);

  useEffect( () => { base('Fundraisers').select({
    view: "All Fields View",
    }).eachPage(function page(records, fetchNextPage) {
        // console.log("Fetching record")
        setFundraisers(records.map(record => record.fields));
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
  }, []);

  // const convertedDate = (date) => format(new Date(date), 'MMM dd');
  
  const dispatchFocusedRecord = (record) => recordsDispatch({
    type: 'chooseRecord',
    payload: record,
    },
    {
      type: ''
    }
  );

  const setHovered = (id) => recordsDispatch({
    type: 'setHovered',
    payload: id,
  });

  // const chooseRecord = (record) => {
  //   const chosenRecord = find(fundraisers, matchesProperty('Organization', record));
  //   console.log('chosenRecord: ', chosenRecord);
  //   dispatchFocusedRecord(record);
  // }

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
        </Header>
        <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              backgroundColor: '#d9d9d9',
              // width: '900px', 
              // maxWidth: '900px', 
              // minWidth: 'auto', 
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
              {/* {fundraisers[0] && <button onClick={() => chooseRecord("Orange Polynomial")}>Click to view Orange Polynomial</button>} */}
              {/* {fundraisers[0] && <button onClick={() => chooseRecord("Nocturnal Potato")}>Click to view Nocturnal Potato</button>} */}
              {/* {fundraisers[0] && <button onClick={() => createSearchFilter(fundraisers)}>Click to Run Filter</button>} */}
              {recordsState.viewFocusedRecord && <FundraiserDetails />}
            </Content>
        </Layout>
      </Layout>
    </RecordsContext.Provider>
    
  );
}

export default App;
