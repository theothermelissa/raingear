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
  records: [],
};



function App() {
  const [fundraisers, setFundraisers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [recordsState, recordsDispatch] = useReducer(recordsReducer, initialState);
  const [usersFundraisers, setUsersFundraisers] = useState('');

  const {user, isAuthenticated} = useAuth0();

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
  
  // if (isAuthenticated) {console.log("user['email']: ", user['email'])};

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



  const getFundraiserData = (user) => {
    // takes in user's record data
    // let usersFundraisers = [{role: 'userRole', id: 'fundraiserID'}, {role: 'userRole', id: 'fundraiserID'}]
    // func getUserSpecificFields = (recordID, role) => switch (role) { case role: theStuffYouNeedForThatRole }
    // 
    // let userRolesInFundraisers = [];
    const addElementToArray = (array, element) => {
      let newArray = [...array, element]
      console.log('newArray: ', newArray);
      return newArray;
    };
    const getRecordsList = (record, field) => record.get(field);
    const createRoleRecord = (role, id) => {
      let roleRecord = {"role": role, "id": id}
      return roleRecord;
    };
    const getUserSpecificData = (role) => {
      switch (role) {
        case 'seller':
          console.log("seller");
        case 'organizer':
          console.log("organizer");
        case 'supplier':
          console.log("supplier");
      }
    }
    let sellerFundraiserRecords = getRecordsList(user, 'RecordID (from Fundraiser) (from sellerRecords)');
    // let sellerFundraiserRecords = user.get('RecordID (from Fundraiser) (from sellerRecords)');
    console.log("sellerFundraiserRecords: ", sellerFundraiserRecords);
    sellerFundraiserRecords.forEach((id) => {
      let recordToAdd = createRoleRecord("seller", id);
      console.log("recordToAdd: ", recordToAdd);
      setUsersFundraisers(addElementToArray(usersFundraisers, recordToAdd));
      // getUserSpecificData('organizer');
      // base('Fundraisers').find(id, function(err, record) {
      //   if (err) { console.error(err); return; }
      //   let sellerTailoredFields = {
      //     "role": "seller",
      //     "fundraiserID": id,
      //     "organization": record.fields.organization,
      //     "organizerPhoneNumber": record.fields.contactPhoneNumber,
      //     "organizerEmail": record.fields.contactEmail,
      //     "organizerFirstName": record.fields.contactFirstName,
      //     "organizerLastName": record.fields.contactLastName,
      //     "products": record.fields.products,
      //     "allSellersTotalRaised": record.fields.organizationProceeds,
      //     "deliveryDate": record.fields.deliveryDate,
      //     "deliveryAddress": record.fields.deliveryAddress,
      //     "sellerDetails": [{
      //       "sellerID": user.id,
      //       "guardianID": userData.fields.sellerGuardian,
      //       "totalOrderCount": userData.fields["Total Orders"],
      //       "sellerTotalSalesVolume": userData.fields["Total Sales Volume"],
      //       "supporters": userData.fields.Supporters,
      //       "orderFormLink": userData.fields["Link to Order from This Seller"],
      //       "userName": userData.fields.Nickname,
      //       "orders": userData.fields.Orders
      //     }],
      //   }
      //   console.log("sellerTailoredFields: ", sellerTailoredFields);
      //   setUsersFundraisers(addElementToArray(usersFundraisers, sellerTailoredFields))
      //   // result.push(sellerTailoredFields);
      //   // console.log('array complete')
      // });
    });
    // let organizerRecords = user.get('organizerRecords');
    // console.log("organizerRecords: ", organizerRecords);
    // organizerRecords.forEach((id) => {
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
    //     setUsersFundraisers(addElementToArray(usersFundraisers, organizerTailoredFields))
    //     // result.push(sellerTailoredFields);
    //     // console.log('array complete')
    //   });
    // });
    // console.log('usersFundraisers: ', usersFundraisers);
  }

    // SellerFundraiser? ? add SellerFundraiser, fundraiser details, orders : don't
    // GuardianFundraiser ? add SellerGuardianFundraiser, fundraiser details, seller w/ orders, other sellers w/ orthers : don't
    // OrganizerFundraiser ? add OrganizerFundraiser, all sellers, all orders : don't
    //
  // };


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
        {usersFundraisers && <div>Here is the data: {JSON.stringify(usersFundraisers)}</div>}
      </Router>
    </RecordsContext.Provider>
  );
}

export default withRouter(App);
