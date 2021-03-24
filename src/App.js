import  React, { useState, useEffect } from 'react';
import './App.css';
import FundraiserTimeline from './components/FundraiserTimeline';
import Inquiries from './components/Inquiries';
import Airtable from 'airtable';
import { format, compareAsc } from 'date-fns';
import { Layout, Menu, Breadcrumb } from 'antd';

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appWga5gfjEZX4q7X');

// const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appWga5gfjEZX4q7X');
const { Header, Content, Sider } = Layout;

function App() {
  const [fundraisers, setFundraisers] = useState([]);

  useEffect( () => { base('Fundraisers').select({
    view: "All Fields View",
    // fields: ["FundraiserName", "Organization"]
    }).eachPage(function page(records, fetchNextPage) {
        setFundraisers(records.map(record => record.fields));
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
  }, []);

  const convertedDate = (date) => format(new Date(date), 'MMM dd');

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: '100%' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[2]}>
          <Menu.Item key="1">Fundraisers</Menu.Item>
          <Menu.Item key="1">Customers</Menu.Item>
          <Menu.Item key="1">Team</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            backgroundColor: 'green',
            width: '900px !important', 
            maxWidth: '900px', 
            minWidth: 'auto', 
          }} 
          className="site-layout-background"
        >
          <FundraiserTimeline fundraisers={fundraisers} />
        </Sider>
      </Layout>
      <Layout className="site-layout" style={{ marginLeft: 0 }}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 250px 0', overflow: 'initial', height: "100vh" }}>
            Stuff goes here.
            <Inquiries fundraisers={fundraisers} />
          </Content>
      </Layout>
    </Layout>
  );
}

export default App;
