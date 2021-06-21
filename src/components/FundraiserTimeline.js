import  React, { useContext, useEffect, useState } from 'react';
import TimelineCard from './TimelineCard';
import { Timeline } from 'antd';
import selectStatusColor from './selectStatusColor';
import { find, matchesProperty, sortBy } from 'lodash';
import {RecordsContext} from '../App';


const FundraiserTimeline = ({ setHovered }) => {
  const { recordsDispatch, recordsState: {
    fundraiserToDisplay: { fundraisers }
  }} = useContext(RecordsContext)

  const [fundraisersForCards, setFundraisersForCards] = useState('');

  useEffect(() => {
    setFundraisersForCards(fundraisers.map((fundraiser) => fundraiser.fields))
  }, fundraisers)
  
  const chooseRecord = (recordName) => {
    const chosenRecord = find(fundraisersForCards, matchesProperty('organization', recordName));
    recordsDispatch({type: 'chooseRecord', payload: chosenRecord["recordID"]})
  }

  const prefillStatus = (currentStatus) => {
    return (
        currentStatus ? currentStatus : "Inquiry"
    )
  };
  
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
        {sortBy(fundraisersForCards, ['deliveryDate']).map(fundraiser => (
            <Timeline.Item 
              // onMouseEnter={() => console.log("fundraiser to hover: ", fundraiser["recordID"])}
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
