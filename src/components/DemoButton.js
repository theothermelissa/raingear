import React, { useState, useEffect, useContext } from 'react';
import { Select } from 'antd';
import { RecordsContext } from '../App';

const { Option } = Select;

const DemoButton = () => {
    const {recordsDispatch} = useContext(RecordsContext);

    function chooseDemo (value) {
        recordsDispatch({
            type: 'setUser',
            payload: `${value}Demo@example.com`
        })
    };
    
    
    return (
        <Select style={{ width: "150px" }} placeholder="Demo" onChange={chooseDemo}>
            <Option key="provider" value="provider">Providers</Option>
            <Option key="organizer" value="organizer">Organizers</Option>
        </Select>
    )
};

export default DemoButton;