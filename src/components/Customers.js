import React, {useContext, useState, useEffect} from 'react';
import {Table, Tag} from 'antd';
import {format} from 'date-fns';
import {RecordsContext} from '../App';

const Customers = ({ guardian, sellerToView }) => {
    const { recordsDispatch, recordsState: {
        fundraiserToDisplay: {
            fields: {
                sellerGuardians: allSellerGuardians,
                products
            }
        }
    } } = useContext(RecordsContext);
    
    const [updatedCustomers, setUpdatedCustomers] = useState('');
    const [currentGuardianRecord, setCurrentGuardianRecord] = useState('');
    const [columns, setColumns] = useState('');
    const [orders, setOrders] = useState('');

    const setFullName = (first, last) => `${first} ${last}`;
    const productInFundraiser = (product) => products.includes(product);
    
    //choose customer data to display
    useEffect(() => {
        const thisGuardian = (allSellerGuardians.filter((record) => record.id === guardian))[0];
        const formattedDate = (date) => format(new Date(date), 'MMM dd');
        if (thisGuardian) {
            const {
                fields: {
                    Sellers
                }
            } = thisGuardian;
            let allOrders = [];
            //set order data to view in table
            Sellers.map((seller) => {
                const {fields: {Orders}} = seller;
                if (sellerToView === "all" || seller.id === sellerToView) {
                    if (Orders) {
                        Orders.map((order) => {
                            const { id, fields: {
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
                                date: formattedDate(date),
                                seller: seller,
                                supporterFirstName: supporterFirstName,
                                supporterLastName: supporterLastName,
                                supporterFullName: setFullName(supporterFirstName, supporterLastName),
                                supporterEmail: supporterEmail,
                                supporterPhone: supporterPhone,
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
            setOrders(allOrders);
            setCurrentGuardianRecord(thisGuardian);
            const createProductColumns = () => {
                let columnTitles = [];
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
                products.map((product) => columnTitles.push({
                    title: product,
                    dataIndex: productDataIndex(product),
                    key: (productDataIndex(product)),
                }));
                // console.log("columnTitles: ", columnTitles);
                return columnTitles;
            }
            const createEmailLink = (address) => `mailto:${address}`;
            setColumns([
                {
                    title: 'Supporter',
                    dataIndex: 'supporterFullName',
                    key: 'name',
                },
                {
                    title: 'Order Date',
                    dataIndex: 'date',
                    key: 'date',
                },
                {
                    title: "Phone",
                    dataIndex: 'supporterPhone',
                    key: 'supporterPhone',
                },
                ...createProductColumns(),
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
            ]);
        };
        
    }, [guardian, sellerToView])
    
    return (
        <div style={{  }}> 
            {orders.length
                ? <Table 
                    columns={columns}
                    dataSource={orders} 
                    pagination={false}
                    id='customersTable'
                />
                : <h1>No orders yet!</h1>
            }
        </div>
    )
};

export default Customers;