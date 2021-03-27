import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button, Timeline } from 'antd';
import { format } from 'date-fns'
import selectStatusColor from './selectStatusColor';

const TimelineCard = ({ fundraiser }) => {

    const convertedDate = (date) => format(new Date(date), 'MMMM dd');

    const { 
        ["Organization"]: org,
        ["Primary Contact First Name"]: primaryFirstName,
        ["Primary Phone"]: primaryPhone,
        ["Primary Email"]: primaryEmail,
        ["ButtCount"]: buttCount,
        ["HamCount"]: hamCount,
        ["TurkeyCount"]: turkeyCount,
        ["SauceCount"]: sauceCount,
    } = fundraiser;
    
    function formatPhoneNumber(ph) {
        var cleaned = ('' + ph).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
      }

    const createEmailLink = (email) => `mailto:${email}`;

    return (
        <div style={{backgroundColor: "white", padding: "8px 8px", margin: "2px 0px", width: "200px", borderRadius: "5px" }}>
            <h2 style={{ color: selectStatusColor(fundraiser.Status), margin: 0}}>{convertedDate(fundraiser["Delivery Date"])}</h2>
            <h3 style={{ color: "#595959", margin: 0}}>{org}</h3>
            <div style={{color: "#595959" }}>{primaryFirstName}</div>
            <div style={{color: "#595959" }}>{primaryPhone}</div>
            <a href={createEmailLink()}>Email</a>  
                {/* <div className="bigIcons">🐖 Butts - {buttCount > 0  ? buttCount : "0"} </div>
                <div className="bigIcons">🐷 Hams - {hamCount > 0  ? hamCount : "0"} </div>
                <div className="bigIcons">🦃 Turkeys - {turkeyCount > 0  ? turkeyCount : "0"} </div>
                <div className="bigIcons">🥫 Sauces - {sauceCount > 0  ? sauceCount : "0"} </div> */}
            {/* <Button type="primary">Button</Button> */}
            {/* <h3>{convertedDate.toDateString()}</h3> */}
            {/* <h3>{testDate.toDateString()}</h3> */}
        </div>
    )
};

export default TimelineCard;