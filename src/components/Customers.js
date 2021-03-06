import React, {useContext, useState, useEffect, useCallback} from 'react';
import {Table} from 'antd';
import {format} from 'date-fns';
import {RecordsContext} from '../App';
import { uniqueId } from 'lodash';

const Customers = ({ guardian, sellerToView }) => {
    const { recordsDispatch, recordsState: {
        fundraiserToDisplay: {
            fundraisers: {
                fields: {
                    sellerGuardians: allSellerGuardians,
                    products
                }
            }
        }
    } } = useContext(RecordsContext);
    
    const [columns, setColumns] = useState('');
    const [orders, setOrders] = useState('');

    const setFullName = (first, last) => `${first} ${last}`;
    const productInFundraiser = useCallback((product) => products.includes(product), [products]);
    const chooseRecord = (record) => recordsDispatch({type: 'chooseRecord', payload: record});
    const createEmailLink = (address) => `mailto:${address}`;
    const formatPhoneNumber = useCallback((ph) => {
        var cleaned = ('' + ph).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }, []);
    
    const formattedOrders = useCallback((sellers) => {
        let allOrders = [];
        const formattedDate = (date) => format(new Date(date), 'MMM dd');
        sellers.forEach((seller) => {
            const {fields: {Orders}} = seller;
            if (sellerToView === "all" || seller.id === sellerToView) {
                if (Orders) {
                    Orders.forEach((order) => {
                        const { fields: {
                            "Order ID": orderID,
                            Date: date,
                            Seller: seller,
                            "Supporter First Name": supporterFirstName,
                            "Supporter Last Name": supporterLastName,
                            "Supporter Email": supporterEmail,
                            "Supporter Phone": supporterPhone,
                            ButtQty: buttQty,
                            HamQty: hamQty,
                            TurkeyQty: turkeyQty,
                            SauceQty: sauceQty,
                            "ButtPrice (from Fundraiser)": buttPrice,
                            "HamPrice (from Fundraiser)": hamPrice,
                            "TurkeyPrice (from Fundraiser)": turkeyPrice,
                            "SaucePrice (from Fundraiser)": saucePrice,
                            "Total Price": totalPrice,
                            Status: orderStatus,
                            PlaceAnOrderURL: placeAnOrderURL,
                            "Supporter Address": supporterAddress,
                            "Supporter AddressLine2": supporterAddressLine2,
                            "Supporter City": supporterCity,
                            "Supporter State": supporterState,
                            "Supporter Zip": supporterZip,
                            "Supporter MailingList OptIn": supporterOptIn,
                        } } = order;
                        const updatedOrders = {
                            orderID: orderID,
                            key: orderID,
                            date: formattedDate(date),
                            seller: seller,
                            supporterFirstName: supporterFirstName,
                            supporterLastName: supporterLastName,
                            supporterFullName: setFullName(supporterFirstName, supporterLastName),
                            supporterEmail: supporterEmail,
                            supporterPhone: formatPhoneNumber(supporterPhone),
                            buttQty: productInFundraiser("Boston Butts") ? buttQty : '',
                            hamQty: productInFundraiser("Half Hams") ? hamQty : '',
                            turkeyQty: productInFundraiser("Whole Turkeys") ? turkeyQty : '',
                            sauceQty: productInFundraiser("BBQ Sauce") ? sauceQty : '',
                            buttPrice: productInFundraiser("Boston Butts") ? buttPrice : '',
                            hamPrice: productInFundraiser("Half Hams") ? hamPrice : '',
                            turkeyPrice: productInFundraiser("Whole Turkeys") ? turkeyPrice : '',
                            saucePrice: productInFundraiser("BBQ Sauce") ? saucePrice : '',
                            totalPrice: `$${totalPrice}`,
                            orderStatus: orderStatus,
                            placeAnOrderURL: placeAnOrderURL,
                            supporterAddress: supporterAddress,
                            supporterAddressLine2: supporterAddressLine2,
                            supporterCity: supporterCity,
                            supporterState: supporterState,
                            supporterZip: supporterZip,
                            supporterOptIn: supporterOptIn,
                        }
                        allOrders.push(updatedOrders);
                    })
                }
            }
        })
        return allOrders;
    }, [formatPhoneNumber, productInFundraiser, sellerToView])

    const createProductColumns = useCallback(() => {
        let productTitles = [];
        const productDataIndex = (product) => {
            let result;
            switch (product) {
                case "Boston Butts": result = ("buttQty");
                    break;
                case "Half Hams": result = ("hamQty");
                    break;
                case "Whole Turkeys": result = ("turkeyQty");
                    break;
                case "BBQ Sauce": result = ("sauceQty");
                    break;
                default: result = "";
            }
            return result;
        }
        products.forEach((product) => productTitles.push({
            title: product,
            dataIndex: productDataIndex(product),
            key: (productDataIndex(product)),
            align: 'center',
        }));
        return [
            {
                title: 'Supporter',
                dataIndex: 'supporterFullName',
                key: 'name',
            },
            {
                title: 'Order Date',
                dataIndex: 'date',
                key: 'date',
                width: '80px',
            },
            {
                title: "Phone",
                dataIndex: 'supporterPhone',
                key: 'supporterPhone',
                width: '140px',
            },
            ...productTitles,
            {
                title: 'Total',
                dataIndex: 'totalPrice',
                key: 'totalPrice'
            },
            {
                title: 'Email',
                dataIndex: 'supporterEmail',
                key: 'supporterEmail',
                render: text => <a href={createEmailLink(text)}>{text}</a>,
                width: '00px'
            }
        ]
    }, [products])

    //choose customer data to display
    useEffect(() => {
        const thisGuardian = (allSellerGuardians.filter((record) => record.id === guardian))[0];
        if (thisGuardian) {
            const {
                fields: {
                    Sellers
                }
            } = thisGuardian;
            //set order data to view in table
            setOrders(formattedOrders(Sellers));
            setColumns(createProductColumns());
        };
        
    }, [guardian, sellerToView, allSellerGuardians, createProductColumns, formattedOrders])
    
    return (
        <div style={{  }}> 
            {orders.length
                ? <Table 
                    columns={columns}
                    dataSource={orders} 
                    pagination={false}
                    id='customersTable'
                    onRow={
                        (record, rowIndex) => {
                            const { id } = record;
                            return {
                                onClick: event => {
                                    chooseRecord(record)
                                },
                                key: uniqueId(`${id}_${rowIndex}`)
                            }
                        }
                    }
                />
                : <h1>No orders yet!</h1>
            }
        </div>
    )
};

export default Customers;