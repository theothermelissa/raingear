import  React, { useContext, useEffect, useState } from 'react';
import { find, matchesProperty, orderBy } from 'lodash';
import {RecordsContext} from '../App';
import SellerCard from './SellerCard';


const Sellers = ({ sellers }) => {
  const [sortedSellers, setSortedSellers] = useState('');

  const setHovered = (id) => {
    console.log("hovering over id: ", id)
    // recordsDispatch({type: 'setHovered', payload: id})
  };

  useEffect(() => {
    if (sellers) {
      let result = orderBy(sellers, item => [item.fields['Total Orders'], item.fields['Total Sales Volume']], ['desc', 'desc']);
      setSortedSellers(result);
    }
  }, [sellers])

  // const chooseRecord = (recordName) => {
  //   const chosenRecord = find(orders, matchesProperty('seller', recordName));
  //   recordsDispatch({type: 'chooseRecord', payload: chosenRecord["recordID"]})
  // }
  
  const {
    recordsDispatch
  } = useContext(RecordsContext);
  
  return (
    <div>
      {sortedSellers && sortedSellers.map((seller) => <SellerCard seller={seller} setHovered={setHovered} />)}
    </div>
  );
}

export default Sellers;
