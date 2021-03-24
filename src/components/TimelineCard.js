import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button, Timeline } from 'antd';
import { format, compareAsc } from 'date-fns'

const TimelineCard = ({ fundraiser }) => {

    const convertedDate = (date) => format(new Date(date), 'MMMM dd');

    const { 
        ["Organization"]: org,
        ["Primary Contact First Name"]: primaryFirstName,
        ["Primary Phone"]: primaryPhone,
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

    return (
        <div style={{borderBottom: "1px solid lightgray"}}>
            <h2 style={{ color: "lightgray", margin: 0}}>{convertedDate(fundraiser["Delivery Date"])}</h2>
            <h3 style={{ color: "lightgray", margin: 0}}>{org}</h3>
            {buttCount > 0  && <span className="bigIcons">{buttCount}-🐖 </span>}
            {hamCount > 0  && <span className="bigIcons">{hamCount}-🐷 </span>}
            {turkeyCount > 0  && <span className="bigIcons">{turkeyCount}-🦃 </span>}
            {sauceCount > 0  && <span className="bigIcons">{sauceCount}-🥫 </span>}
            {/* <Button type="primary">Button</Button> */}
            {/* <h3>{convertedDate.toDateString()}</h3> */}
            {/* <h3>{testDate.toDateString()}</h3> */}
        </div>
    )
};

export default TimelineCard;