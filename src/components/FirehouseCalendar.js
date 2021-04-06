import React, { useState, useEffect } from 'react';
import { Calendar, Badge } from 'antd';
import { find, matchesProperty, filter } from 'lodash';
import {format} from 'date-fns';
import moment from 'moment';

const FirehouseCalendar = ({ fundraisers }) => {
    const [fundraiserData, setFundraiserData] = useState([]);

    useEffect(() => {
        setFundraiserData(fundraisers.map(record => {
            return {
                ...record,
                'deliveryDate': moment(record['deliveryDate']),
                'key': record["recordID"],
            }
        }))
        // setFundraiserData(fundraisers);
    }, [fundraisers]);


    // take in calendar day
    // find fundraiser(s) with deliveryDates on that day
    // display that day's fundraisers as status-colored trays with avatars for each product and badges for current totals
    // onHover, display organization name

    // const thisDaysDeliveries = (dateToDisplay) => filter(fundraiserData, ['deliveryDate', dateToDisplay]);
    
    // function getDeliveryTotals(date) {
    //         console.log("thisDaysDeliveries(date): ", thisDaysDeliveries(date));
    // };

    const dateIsMatch = (firstDate, secondDate) => moment(firstDate).isSame(secondDate, 'day');

    // _.filter(list, ['status', 'protective']);

    // useEffect( () => { 
    //     setFocusedFundraiser(
    //       find(fundraisers, matchesProperty('recordID', recordsState["focusedRecordID"])))
    //   }, [recordsState, fundraisers]);
    
    function dateCellRender(date) {
        // fundraiserData[0] && console.log("fundraiser 0 date: ", fundraiserData[0]["deliveryDate"]);
        // const deliveryTotals = getDeliveryTotals(date);
        
        return (
            <>
                {fundraiserData && fundraiserData.map(item => {
                    if (dateIsMatch(date, item["deliveryDate"])) {
                        console.log("there are matches for: ", date["_d"])
                        return (
                                <div>Delivery</div>
                        )
                    }
                })
                }
            </>
        );
        }

    return (
        <>
            {fundraisers[0] && <Calendar style={{ margin: "30px 0px" }} dateCellRender={dateCellRender}/>}
        </>
    );
};

export default FirehouseCalendar;