import  React, { useContext } from 'react';
import OrderCard from './OrderCard';
import { Timeline } from 'antd';
import selectStatusColor from './selectStatusColor';
import { find, matchesProperty, sortBy } from 'lodash';
import {RecordsContext} from '../App';


const Orders = ({ orders, setHovered }) => {
  const chooseRecord = (recordName) => {
    const chosenRecord = find(orders, matchesProperty('seller', recordName));
    recordsDispatch({type: 'chooseRecord', payload: chosenRecord["recordID"]})
  }

//   const prefillStatus = (currentStatus) => {
//     return (
//         currentStatus ? currentStatus : "Inquiry"
//     )
//   };
  
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
        {sortBy(orders, ['deliveryDate']).map(order => (
            <Timeline.Item 
              onMouseEnter={() => setHovered(order['recordID'])}
              onMouseLeave={() => setHovered(null)}
              onClick={() => chooseRecord(order['organization'])}
            //   color={selectStatusColor(prefillStatus(order["status"]))}
              key={order["recordID"]}
            >
              <OrderCard order={order} />
            </Timeline.Item>
        ))}
        </Timeline>
      </div>
    </div>
  );
}

export default Orders;
