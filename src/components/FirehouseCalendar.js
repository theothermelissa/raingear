import React, { useState, useEffect } from 'react';
import { Calendar, Avatar, Badge } from 'antd';
import { includes, matchesProperty, filter } from 'lodash';
import {format} from 'date-fns';
import moment from 'moment';
import selectStatusColor from './selectStatusColor';

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


    // display that day's fundraisers as status-colored trays with avatars for each product and badges for current totals
    // onHover, display organization name

    // const thisDaysDeliveries = (dateToDisplay) => filter(fundraiserData, ['deliveryDate', dateToDisplay]);
    
    // function getDeliveryTotals(date) {
    //         console.log("thisDaysDeliveries(date): ", thisDaysDeliveries(date));
    // };

    const dateIsMatch = (firstDate, secondDate) => moment(firstDate).isSame(secondDate, 'day');

    const hasButts = (record) => includes(record["products"], 'Boston Butts');
    const hasHams = (record) => includes(record["products"], 'Half Hams');
    const hasTurkeys = (record) => includes(record["products"], 'Whole Turkeys');
    const hasSauce = (record) => includes(record["products"], 'BBQ Sauce');

    // _.filter(list, ['status', 'protective']);

    // useEffect( () => { 
    //     setFocusedFundraiser(
    //       find(fundraisers, matchesProperty('recordID', recordsState["focusedRecordID"])))
    //   }, [recordsState, fundraisers]);
    
    function dateCellRender(date) {
        // fundraiserData[0] && console.log("fundraiser 0 date: ", fundraiserData[0]["deliveryDate"]);
        // const deliveryTotals = getDeliveryTotals(date);
        
        // border: `1px solid ${selectStatusColor(item["status"])}`, 

        return (
            <>
                {fundraiserData && fundraiserData.map(item => {
                    if (dateIsMatch(date, item["deliveryDate"])) {
                        console.log("there are matches for: ", date["_d"])
                        return (
                            <Avatar.Group style={{ width: '100%', backgroundColor: '#f0f0f0', padding: "3px",borderRadius: "5px", margin: "4px 4px 0px 0px", }} >
                                {hasButts(item) && 
                                    <Badge style={{ backgroundColor: "#8c8c8c" }} size="small" showZero count={item["buttCount"]}>
                                        <Avatar size="medium" style={{ color: 'white', backgroundColor: '#597ef7' }}>B</Avatar>
                                    </Badge>
                                }
                                {hasHams(item) && 
                                    <Badge style={{ backgroundColor: "#8c8c8c" }} size="small" showZero count={item["hamCount"]}>
                                        <Avatar size="medium" style={{ color: 'white', backgroundColor: '#7cb305' }}>H</Avatar>
                                    </Badge>
                                }
                                {hasTurkeys(item) && 
                                    <Badge style={{ backgroundColor: "#8c8c8c" }} size="small" showZero count={item["turkeyCount"]}>
                                        <Avatar size="medium" style={{ color: 'white', backgroundColor: '#13c2c2' }}>T</Avatar>
                                    </Badge>
                                }
                                {hasSauce(item) && 
                                    <Badge style={{ backgroundColor: "#8c8c8c" }} size="small" showZero count={item["sauceCount"]}>
                                        <Avatar size="medium" style={{ color: 'white', backgroundColor: '#9254de' }}>S</Avatar>
                                    </Badge>
                                }
                            </Avatar.Group>
                                // <div>{item["buttCount"]} butts</div>
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