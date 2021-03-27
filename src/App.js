import  React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import FundraiserTimeline from './components/FundraiserTimeline';
import AllFundraisers from './components/AllFundraisers';
import Airtable from 'airtable';
import { format, compareAsc } from 'date-fns';
import { Layout, Menu, Breadcrumb } from 'antd';
import { initial } from 'lodash';
import recordsReducer from './reducers/recordsReducer';
import FundraiserDetails from './components/FundraiserDetails';

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appWga5gfjEZX4q7X');

// const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appWga5gfjEZX4q7X');
const { Header, Content, Sider } = Layout;
export const RecordsContext = React.createContext(null);
export const RecordsDispatch = React.createContext(null);

//initial state: { base: airtableBase, focusedRecord: null, alerts: 0, newRecord: false }

const initialState = {
  focusedRecord: null,
  alerts: [],
  newRecord: false,
};

function App() {
  const [fundraisers, setFundraisers] = useState([]);
  const [recordsState, recordsDispatch] = useReducer(recordsReducer, initialState);
  // const [fundraiserState, fundraiserStateDispatch] = useReducer(recordsReducer, initialState);

  useEffect( () => { base('Fundraisers').select({
    view: "All Fields View",
    // fields: ["FundraiserName", "Organization"]
    }).eachPage(function page(records, fetchNextPage) {
        // console.log("Fetching record")
        setFundraisers(records.map(record => record.fields));
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
  }, []);

  const convertedDate = (date) => format(new Date(date), 'MMM dd');
  
  const selectFundraiser = () => {recordsDispatch({
    type: 'chooseRecord',
    payload: fundraisers[1],
    });
  }

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
            <FundraiserTimeline fundraisers={fundraisers} />
          </Sider>
        </Layout>
        <Layout className="site-layout" style={{ marginLeft: 0 }}>
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ overflow: 'initial', height: "100vh" }}>
              <AllFundraisers fundraisers={fundraisers} />
              {fundraisers[0] && <button onClick={selectFundraiser}>Click to select fundraiser</button>}
              {fundraisers[0] && <FundraiserDetails fundraiser={fundraisers[0]}/>}
            </Content>
        </Layout>
      </Layout>
    </RecordsContext.Provider>
    
  );
}

export default App;
