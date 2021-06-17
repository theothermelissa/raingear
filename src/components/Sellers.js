import  React, { useContext, useEffect, useState } from 'react';
import { find, matchesProperty, orderBy } from 'lodash';
import {RecordsContext} from '../App';
import SellerCard from './SellerCard';


const Sellers = ({ sellers }) => {
  const [sortedSellers, setSortedSellers] = useState('');

  useEffect(() => {
    if (sellers) {
      let result = orderBy(sellers, item => [item.fields['Total Orders'], item.fields['Total Sales Volume']], ['desc', 'desc']);
      setSortedSellers(result);
    }
  }, [sellers])

  console.log("sortedSellers: ", sortedSellers)

  // const chooseRecord = (recordName) => {
  //   const chosenRecord = find(orders, matchesProperty('seller', recordName));
  //   recordsDispatch({type: 'chooseRecord', payload: chosenRecord["recordID"]})
  // }
  
  const {
    recordsDispatch
  } = useContext(RecordsContext);
  
  return (
    <div>
      {sortedSellers && sortedSellers.map((seller) => <SellerCard seller={seller} />)}
    </div>
  );
}

export default Sellers;
