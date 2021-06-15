import React, {useContext, useState, useEffect} from 'react';
import {Table, Tag} from 'antd';
import {format} from 'date-fns';
import {RecordsContext} from '../App';

const Customers = ({ guardian, seller }) => {
    const { recordsDispatch, recordsState: {
        fundraiserToDisplay: {
            fields: {
                sellerGuardians: allSellerGuardians
            }
        }
    } } = useContext(RecordsContext);
    
    // const convertedDate = (date) => format(newDate(date), 'MMM dd');
    const [updatedCustomers, setUpdatedCustomers] = useState('');
    const [currentGuardianRecord, setCurrentGuardianRecord] = useState('');
    const [columns, setColumns] = useState('');
    const [orders, setOrders] = useState('');

    //choose which customer to display
    useEffect(() => {
        const thisGuardian = (allSellerGuardians.filter((record) => record.id === guardian))[0];
        if (thisGuardian) {
            const {
                fields: {
                    Sellers
                }
            } = thisGuardian;
            let allOrders = [];
            Sellers.map((seller) => {
                const {fields: {Orders}} = seller;
                Orders.map((order) => {
                    console.log("order: ", order);
                    const { fields } = order;
                    allOrders.push(fields);
                })
            })
            setOrders(allOrders);
            setCurrentGuardianRecord(thisGuardian);
            setColumns([
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id'
                }
            ]);
        };
        
    }, [guardian])
    
    return (
        <> {
                orders && orders.map((order) => {
                    return (<div key={order["Order ID"]}>{order["Order ID"]}</div>)
                })
            }
        </>
    )
};

export default Customers;