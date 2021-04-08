import  React, { useContext, useEffect, useState } from 'react';
import TimelineCard from './TimelineCard';
import { Timeline } from 'antd';
import selectStatusColor from './selectStatusColor';
import { find, matchesProperty } from 'lodash';
import {RecordsContext} from '../App';


const FundraiserTimeline = ({ fundraisers, setHovered }) => {
  const chooseRecord = (recordName) => {
    const chosenRecord = find(fundraisers, matchesProperty('organization', recordName));
    recordsDispatch({type: 'chooseRecord', payload: chosenRecord["recordID"]})
  }
  const [updatedFundraisers, setUpdatedFundraisers] = useState('');

  const prefillStatus = (currentStatus) => {
    // console.log("currentStatus: ", currentStatus);
    return (
        currentStatus ? currentStatus : "Inquiry"
    )
  };
  
  // useEffect(()=> {
  //   setUpdatedFundraisers({
  //     "status": prefillStatus(fundraisers["status"]),
  //     ...fundraisers,
  //   })
  // }, [])
  

  const {
    recordsDispatch
  } = useContext(RecordsContext);
  
  return (
    <div>
      <div>
        <Timeline
          mode="left"
          style={{
            marginLeft: "20px",
            padding: "30px 40px 0px 0px",
            maxWidth: '500px'
          }}
        >
        {fundraisers.map(fundraiser => (
            <Timeline.Item 
              onMouseEnter={() => setHovered(fundraiser['recordID'])}
              onMouseLeave={() => setHovered(null)}
              onClick={() => chooseRecord(fundraiser['organization'])}
              color={selectStatusColor(prefillStatus(fundraiser["status"]))}
              key={fundraiser["recordID"]}
            >
              <TimelineCard fundraiser={fundraiser} />
            </Timeline.Item>
        ))}
        </Timeline>
      </div>
    </div>
  );
}

export default FundraiserTimeline;
