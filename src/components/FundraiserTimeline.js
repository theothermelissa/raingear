import  React, { useState, useEffect } from 'react';
import TimelineCard from './TimelineCard';
import { Button, Timeline } from 'antd';
import selectStatusColor from './selectStatusColor';

const FundraiserTimeline = ({ fundraisers }) => {
  return (
    <div>
      <div>
        <Timeline mode="left" style={{marginLeft: "20px", padding: "100px 40px 0px 0px", maxWidth: '500px'}} >
        {fundraisers.map(fundraiser => (
            <Timeline.Item color={selectStatusColor(fundraiser.Status)} key={fundraiser.RecordID} >
              <TimelineCard fundraiser={fundraiser} />
            </Timeline.Item>
        ))}
        </Timeline>
      </div>
    </div>
  );
}

export default FundraiserTimeline;
