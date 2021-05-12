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
import { useAuth0 } from '@auth0/auth0-react';
import userEvent from '@testing-library/user-event';

export const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
}).base('appWga5gfjEZX4q7X');
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
  records: [],
};

function App() {
  const [fundraisers, setFundraisers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [recordsState, recordsDispatch] = useReducer(recordsReducer, initialState);
  const [usersFundraisersIndex, setUsersFundraisersIndex] = useState([]);
  const [recordsToDisplay, setRecordsToDisplay] = useState([]);

  const {user, isAuthenticated} = useAuth0();

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

  useEffect(() => {
    if (isAuthenticated) {
        base('Users').select({
          filterByFormula: `{Email} = "${user.email}"`
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
              setUserData(record)  
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        })
    }
  }, [isAuthenticated])

  useEffect(() => {
    if(userData.id) {
      getFundraiserData(userData);
    }
  }, [userData]);
  
  useEffect(() => {
    if(usersFundraisersIndex[0]) {
      getDataToDisplay(usersFundraisersIndex);
    }
  }, [usersFundraisersIndex]);

  const getDataToDisplay = (fundraisers ) => {
    //loop through list of fundraisers
    //for each 'organizer' one, do organizer-like things
    //for each 'seller' one, do seller-like things
    //for each 'guardian' one, do guardian-like things
    //for each 'provider' one, do provider-like things
  }
  
  const getFundraiserData = (user) => {
    // func getUserSpecificFields = (recordID, role) => switch (role) { case role: theStuffYouNeedForThatRole }
    // let userRolesInFundraisers = [];
    let workingFundraiserList = [];
    
    const addElementToArray = (array, element) => {
      workingFundraiserList = [...array, element]
      console.log('array: ', array);
      console.log('workingFundraiserList: ', workingFundraiserList);
      return workingFundraiserList;
    };

    const getRecordsList = (record, field) => record.get(field);

    const createRoleRecord = (role, id) => {
      let roleRecord = {"role": role, "id": id}
      return roleRecord;
    };
    
    const getUserSpecificData = (role, id) => {
      switch (role) {
        case 'seller':
          base('Fundraisers').find(id, function(err, record) {
            if (err) { console.error(err); return; }
            let sellerTailoredFields = {
              "role": "seller",
              "fundraiserID": id,
              "organization": record.fields.organization,
              "organizerPhoneNumber": record.fields.contactPhoneNumber,
              "organizerEmail": record.fields.contactEmail,
              "organizerFirstName": record.fields.contactFirstName,
              "organizerLastName": record.fields.contactLastName,
              "products": record.fields.products,
              "allSellersTotalRaised": record.fields.organizationProceeds,
              "deliveryDate": record.fields.deliveryDate,
              "deliveryAddress": record.fields.deliveryAddress,
              "sellerDetails": [{
                "sellerID": user.id,
                "guardianID": userData.fields.sellerGuardian,
                "totalOrderCount": userData.fields["Total Orders"],
                "sellerTotalSalesVolume": userData.fields["Total Sales Volume"],
                "supporters": userData.fields.Supporters,
                "orderFormLink": userData.fields["Link to Order from This Seller"],
                "userName": userData.fields.Nickname,
                "orders": userData.fields.Orders
              }],
            }
            console.log("sellerTailoredFields: ", sellerTailoredFields);
            // result.push(sellerTailoredFields);
            // console.log('array complete')
          });
        case 'organizer':
          console.log("organizer");
        case 'supplier':
          console.log("supplier");
      }
    }
    let sellerFundraiserRecords = getRecordsList(user, 'RecordID (from Fundraiser) (from sellerRecords)');
    console.log("sellerFundraiserRecords: ", sellerFundraiserRecords);
    if (sellerFundraiserRecords) {
      sellerFundraiserRecords.forEach((id) => {
        let recordToAdd = createRoleRecord("seller", id);
        console.log("seller recordToAdd: ", recordToAdd);
        addElementToArray(workingFundraiserList, recordToAdd);
        getUserSpecificData("seller", id);
      });}
    let organizerRecords = getRecordsList(user, 'organizerRecords');
    console.log('organizerRecords: ', organizerRecords);
    if (organizerRecords) {
    organizerRecords.forEach((id) => {
      let recordToAdd = createRoleRecord("organizer", id);
      console.log("organizer recordToAdd: ", recordToAdd);
      addElementToArray(workingFundraiserList, recordToAdd);
    
      });
    }
    setUsersFundraisersIndex(workingFundraiserList);
  }

  




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
          {/* {recordsState["drawerVisible"] && 
            <EditDrawer />
          }
        <Switch> 
          <Route exact path="/" render={props => <FundraisersPage fundraisers={fundraisers} {...props}/>} />
          <Route path="/calendar" render={props => fundraisers[0] && <FirehouseCalendar fundraisers={fundraisers} {...props} />}/>
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/orgView" component={OrganizerView} />
        </Switch> */}
        {/* {userData.id && <div>Here is the data: {JSON.stringify(userData)}</div>} */}
        {usersFundraisersIndex && <div>Here is the data: {JSON.stringify(usersFundraisersIndex)}</div>}
      </Router>
    </RecordsContext.Provider>
  );
}

export default withRouter(App);

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

      // SellerFundraiser? ? add SellerFundraiser, fundraiser details, orders : don't
    // GuardianFundraiser ? add SellerGuardianFundraiser, fundraiser details, seller w/ orders, other sellers w/ orthers : don't
    // OrganizerFundraiser ? add OrganizerFundraiser, all sellers, all orders : don't
    //
  // };
  
  // if (isAuthenticated) {console.log("user['email']: ", user['email'])};

// getUserSpecificData('organizer');
        

        //   base('Fundraisers').find(id, function(err, record) {
        //     if (err) { console.error(err); return; }
        //     let organizerTailoredFields = {
        //       "role": "organizer",
        //       "fundraiserID": id,
        //       "organization": record.fields.organization,
        //       "organizerPhoneNumber": record.fields.contactPhoneNumber,
        //       "organizerEmail": record.fields.contactEmail,
        //       "organizerFirstName": record.fields.contactFirstName,
        //       "organizerLastName": record.fields.contactLastName,
        //       "products": record.fields.products,
        //       "allSellersTotalRaised": record.fields.organizationProceeds,
        //       "deliveryDate": record.fields.deliveryDate,
        //       "deliveryAddress": record.fields.deliveryAddress,
        //       // "sellerDetails": getSellerRecords();
        //       // "sellerDetails": [{
        //       //   "sellerID": user.id,
        //       //   "guardianID": userData.fields.sellerGuardian,
        //       //   "totalOrderCount": userData.fields["Total Orders"],
        //       //   "sellerTotalSalesVolume": userData.fields["Total Sales Volume"],
        //       //   "supporters": userData.fields.Supporters,
        //       //   "orderFormLink": userData.fields["Link to Order from This Seller"],
        //       //   "userName": userData.fields.Nickname,
        //       //   "orders": userData.fields.Orders
        //       // }],
        //     }
        //     console.log("organizerTailoredFields: ", organizerTailoredFields);
        //     setUsersFundraisersIndex(addElementToArray(usersFundraisersIndex, organizerTailoredFields))
        //     // result.push(sellerTailoredFields);
        //     // console.log('array complete')
        //   });