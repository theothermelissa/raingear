import  React, { useState, useEffect } from 'react';
import './App.css';
import FundraiserCard from './components/FundraiserCard';
import Airtable from 'airtable';
const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appWga5gfjEZX4q7X');

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

  return (
    <div className="App">
      <h1>Upcoming Cooks:</h1>
      {fundraisers.map(fundraiser => (
          <FundraiserCard key={fundraiser.RecordID} fundraiser={fundraiser} />
      ))}
    </div>
  );
}

export default App;
