import  React, { useContext, useEffect, useState } from 'react';
import { find, matchesProperty, orderBy } from 'lodash';
import SellerCard from './SellerCard';
import highlightReducer from '../reducers/highlightReducer';


const Sellers = ({ sellers, setHighlight, removeHighlight }) => {
  const [sortedSellers, setSortedSellers] = useState('');

  useEffect(() => {
    if (sellers) {
      let result = orderBy(sellers, item => [item.fields['Total Orders'], item.fields['Total Sales Volume']], ['desc', 'desc']);
      setSortedSellers(result);
    }
  }, [sellers])

  // const chooseRecord = (recordName) => {
  //   const chosenRecord = find(orders, matchesProperty('seller', recordName));
  //   highlightDispatch({type: 'chooseRecord', payload: chosenRecord["recordID"]})
  // }
  
  return (
    <div>
      {sortedSellers && sortedSellers.map((seller) => <SellerCard seller={seller} key={seller.id} setHighlight={setHighlight} removeHighlight={removeHighlight} />)}
    </div>
  );
}

export default Sellers;
