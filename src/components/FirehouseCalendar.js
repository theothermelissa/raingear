import React, { useState, useEffect, useContext } from 'react';
import { Calendar, Avatar, Badge } from 'antd';
import { includes, sortBy, find, matchesProperty } from 'lodash';
import moment from 'moment';
import {RecordsContext} from '../App';


const FirehouseCalendar = ({ fundraisers }) => {
    const [fundraiserData, setFundraiserData] = useState([]);
    const {
        recordsDispatch
      } = useContext(RecordsContext);

    useEffect(() => {
        setFundraiserData(fundraisers.map(record => {
            return {
                ...record,
                'deliveryDate': moment(record['deliveryDate']),
                'key': record["recordID"],
            }
        }))
    }, [fundraisers]);

    const showDrawer = (item) => {
        recordsDispatch({type: "selectDate", payload: item});
        recordsDispatch({type: "showDrawer"});
    }

    const chooseRecordToEdit = (recordName) => {
        const chosenRecord = find(fundraiserData, matchesProperty('organization', recordName));
        recordsDispatch({type: "showDrawer"});
        recordsDispatch({type: 'editRecord', payload: chosenRecord["recordID"]})
    }

    const dateIsMatch = (firstDate, secondDate) => moment(firstDate).isSame(secondDate, 'day');

    const hasButts = (record) => includes(record["products"], 'Boston Butts');
    const hasHams = (record) => includes(record["products"], 'Half Hams');
    const hasTurkeys = (record) => includes(record["products"], 'Whole Turkeys');
    const hasSauce = (record) => includes(record["products"], 'BBQ Sauce');
    
    function dateCellRender(date) {
        return (
            <div>
                {fundraiserData && fundraiserData.map(item => {
                    if (dateIsMatch(date, item["deliveryDate"])) {
                        return (
                            <div key={item["organization"]} onClick={() => chooseRecordToEdit(item["organization"])}>
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
                            </div>
                        )
                    }
                })
                }
            </div>
        );
    }
    
    function monthCellRender(value) {
        const monthIsMatch = (object) => moment(object["deliveryDate"]).isSame(value, 'month');
        const monthsFundraisers = sortBy(fundraiserData.filter(monthIsMatch), ['deliveryDate']);
        return (
            <div>
                {monthsFundraisers.map((item) => {
                    return (
                        <div 
                            onClick={() => chooseRecordToEdit(item["organization"])}
                            key={item["organization"]}
                            style={{ 
                                width: '100%', 
                                backgroundColor: '#f0f0f0', 
                                padding: "2px",
                                borderRadius: "5px", 
                                margin: "2px 2px 0px 0px", 
                            }}
                        >
                            {item["deliveryDate"].format('DD')} - {item["organization"]}
                        </div>
                    )
                })
                }
            </div>
        )
        
    }

    return (
        <div>
            {
                fundraisers[0] && 
                <Calendar
                    onSelect={showDrawer}
                    dateCellRender={dateCellRender}
                    monthCellRender={monthCellRender}
                />
            }
        </div>
    );
};

export default FirehouseCalendar;