import  React, { useState, useEffect } from 'react';
import TimelineCard from './TimelineCard';
import Airtable from 'airtable';
import { Button, Timeline } from 'antd';
// import { format, compareAsc } from 'date-fns'


const FundraiserTimeline = ({ fundraisers }) => {
  return (
    <div>
      <div>
        <Timeline mode="right" style={{marginLeft: "20px", padding: "100px 40px 0px 0px", maxWidth: '500px'}} >
        {fundraisers.map(fundraiser => (
            <Timeline.Item key={fundraiser.RecordID} >
              <TimelineCard fundraiser={fundraiser} />
            </Timeline.Item>
        ))}
        </Timeline>
      </div>
    </div>
  );
}

export default FundraiserTimeline;
