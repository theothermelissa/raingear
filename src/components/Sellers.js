import  React, { useEffect, useState } from 'react';
import { orderBy } from 'lodash';
import SellerCard from './SellerCard';


const Sellers = ({ sellers, setHighlight, removeHighlight }) => {
  const [sortedSellers, setSortedSellers] = useState('');

  useEffect(() => {
    if (sellers) {
      let result = orderBy(sellers, item => [item.fields['Total Orders'], item.fields['Total Sales Volume']], ['desc', 'desc']);
      setSortedSellers(result);
    }
  }, [sellers])

  return (
    <div>
      {sortedSellers && sortedSellers.map((seller) => <SellerCard seller={seller} key={seller.id} setHighlight={setHighlight} removeHighlight={removeHighlight} />)}
    </div>
  );
}

export default Sellers;
