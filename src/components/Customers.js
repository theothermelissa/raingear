import React, {useContext, useState, useEffect} from 'react';
import {Table, Tag} from 'antd';
import {format} from 'date-fns';
import {RecordsContext} from '../App';

const Customers = ({ guardian }) => {
    const { recordsDispatch, recordsState: {
        fundraiserToDisplay: {
            fields: {
                sellerGuardians: allSellerGuardians
            }
        }
    } } = useContext(RecordsContext);
    
    // const convertedDate = (date) => format(newDate(date), 'MMM dd');
    const [updatedCustomers, setUpdatedCustomers] = useState('');

    //choose which customer to display

    console.log("guardian: ", guardian);

    return (
        <>
            <div style={{ height: "100vh" }}>{guardian.fields.Sellers.map(seller => <div key={seller.id}>{seller.fields.Nickname} has {seller.fields["Total Orders"]} orders.</div>)}</div>
        </>
    )
};

export default Customers;