import  React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // const [fundraisers, setFundraisers] = useState([]);

  let Airtable = require('airtable');
  let base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appWga5gfjEZX4q7X');
  const [currentFundraiser, setCurrentFundraiser] = useState("");

  // base('Fundraisers').find('recPpH4XZwX6pw6XX', function(err, record) {
  //     if (err) { console.error(err); return; }
  //     console.log('Retrieved', record.id);
  // });

  useEffect( () => { base('Fundraisers').select({
    // Selecting the first 3 records in All Fields View:
    // maxRecords: 3,
    filterByFormula: `{Organization} = "${currentFundraiser}"`,
    view: "All Fields View",
    // fields: ["FundraiserName", "Organization"]
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            console.log('Retrieved', record.get('FundraiserName'));
            // console.log('Primary Contact: ', record.get('Primary Contact'));
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
  }, [currentFundraiser]);

  let chooseOrange = () => setCurrentFundraiser("Orange Polynomial")

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* </header> */}
    <h1>The current fundraiser is: {currentFundraiser}.</h1>
    <button onClick={chooseOrange}>Click Me To Choose Orange</button>
    </div>
  );
}

export default App;
