import  React, { useContext } from 'react';
import { find, matchesProperty, sortBy } from 'lodash';
import {RecordsContext} from '../App';
import SellerCard from './SellerCard';


const Sellers = ({ sellers }) => {
  // const chooseRecord = (recordName) => {
  //   const chosenRecord = find(orders, matchesProperty('seller', recordName));
  //   recordsDispatch({type: 'chooseRecord', payload: chosenRecord["recordID"]})
  // }
  
  const {
    recordsDispatch
  } = useContext(RecordsContext);
  
  return (
    <div>
      {sellers && sellers.map((seller) => <SellerCard seller={seller} />)}
    </div>
  );
}

export default Sellers;
