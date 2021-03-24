import  React, { useState, useEffect } from 'react';
import TimelineCard from './TimelineCard';
import Airtable from 'airtable';
import { Button, Timeline } from 'antd';
const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appWga5gfjEZX4q7X');

const Inquiries = ({ fundraisers }) => {

    const [activeFundraiser, setActiveFundraiser] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [hasBeenUpdated, setHasBeenUpdated] = useState(false);

    // const onChange = event => setInputValue(event.target.value);

    // useEffect( () => { base('Fundraisers').select({
    //     view: "All Fields View",
    //     // fields: ["FundraiserName", "Organization"]
    //     }).eachPage(function page(records, fetchNextPage) {
    //         setFundraisers(records.map(record => record.fields));
    //         fetchNextPage();
    //     }, function done(err) {
    //         if (err) { console.error(err); return; }
    //     });
    // }, []);

    useEffect( () => { base('Fundraisers').find(
        'rec43VLzoUTfiQX13', 
        function (err, record) {
            if (err) {
                console.log("Error: ", err);
                return;
            } 
            console.log("Retrieved fundraiser #: 'rec43VLzoUTfiQX13'")
            setActiveFundraiser(record);
            setHasBeenUpdated(false);
        });
    }, [hasBeenUpdated]);

    const changeName = (id, newName) => {
        base('Fundraisers').update([
            {
                "id": id,
                "fields": {
                    "Organization": newName
                }
            }
        ], function(err, records) {
            if (err) {
                console.log("Error: ", err);
                return;
            }
        });
        setHasBeenUpdated(true);
    };

    
    
    return (
        <div>
            <input type="text" value={inputValue} placeholder="Try it" onChange={(e) => setInputValue(e.target.value)}/>
            <div>New Value: {inputValue}</div>
            <Button onClick={() => changeName('rec43VLzoUTfiQX13', inputValue)}>Set New Name</Button>
            <div>Active Fundraiser: {activeFundraiser.fields && <h1>{activeFundraiser.fields.Organization}</h1>}
            </div>
        </div>
    );
}

export default Inquiries;
