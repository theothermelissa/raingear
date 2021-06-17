import React, {useContext, useState, useEffect} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, TeamOutlined} from '@ant-design/icons';
import {find, matchesProperty} from 'lodash';
import {RecordsContext} from '../App';
import Orders from './Orders';
import Sellers from './Sellers';

const OrganizerView = () => {
    const {
        recordsDispatch,
        recordsState: {
            whichDataIsLoaded,
            hoveredID,
            fundraiserToDisplay: {
                fields: fundraiserFields,
                fields: {
                    sellerGuardians
                }
            }
        }
    } = useContext(RecordsContext);
    const {Sider, Content} = Layout;

    const [sellersToDisplay, setSellersToDisplay] = useState('');
    const [ordersToDisplay, setOrdersToDisplay] = useState('');
    const [highlightedOrders, setHighlightedOrders] = useState('');

    // const isHovered = (id) => highlightedRecordIDs.includes(id);

    // useEffect(() => {
    //     if (hoveredID && !highlightedOrders) {
    //         console.log("There's a hoveredID: ", hoveredID)
    //         // setHighlightedOrders(find(ordersToDisplay, matchesProperty('recordID', hoveredID)));
    //     }
    //     // return() => {
    //     //     setHighlightedOrders('')
    //     // }
    // }, [hoveredID])

    // useEffect(() => {
    //     if (selectedSeller) {
    //         console.log("selectedSeller: ", selectedSeller);
    //     }
    //     return () => {
    //         setSelectedSeller('');
    //     }
    // }, [selectedSeller])

    useEffect(() => {
        if (sellerGuardians) {
            // let totalGuardians = sellerGuardians.length;
            // let guardiansRetrieved = 0;
            let allOrders = [];
            let allSellers = [];
            if (!sellersToDisplay) {
                sellerGuardians.map((guardian) => {
                    // let totalSellers = 0;
                    // let sellersRetrieved = 0;
                    // let totalOrders = 0;
                    // let ordersRetrieved = 0;
                    const {
                        fields: {
                            Sellers: sellers
                        }
                    } = guardian;
                    if (sellers) {
                        // totalSellers = sellers.length;
                        // console.log("totalSellers: ", totalSellers);
                        // if (totalSellers === sellersRetrieved && totalOrders === ordersRetrieved) {
                        // setSellersToDisplay(allSellers);
                        // setOrdersToDisplay(allOrders);
                        // return;
                        // };
                        sellers.map((seller) => {
                            allSellers.push(seller)
                            if (seller.fields.Orders) { // totalOrders = totalOrders + seller.fields.Orders.length;
                                seller.fields.Orders.map((order) => {
                                    allOrders.push(order);
                                    // console.log("increment ordersRetrieved.")
                                    // ordersRetrieved += 1;
                                });
                            }
                            // console.log("increment sellersRetrieved.")
                            // sellersRetrieved += 1;
                        })
                    }
                    // console.log("increment guardiansRetrieved.")
                    // guardiansRetrieved += 1;
                })
                setSellersToDisplay(allSellers);
                setOrdersToDisplay(allOrders);
            }
        }
    }, [fundraiserFields, sellersToDisplay, ordersToDisplay]);


    return (
        <>
            <Layout>
                <Sider style={
                        {
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            backgroundColor: '#d9d9d9'
                        }
                    }
                    width="auto"
                    className="site-layout-background">
                    {/* <div>Here are the sellers: {JSON.stringify(sellersToDisplay)}</div> */}
                    {/* <h1 style={{ fontSize: '1.5em', margin: '10px 0px 0px 90px' }}>SELLERS</h1> */}
                    <Sellers sellers={sellersToDisplay}/>
                </Sider>
            </Layout>
            <Layout>
                <Content style={
                    {
                        overflow: 'initial',
                        minHeight: '100vh'
                    }
                }>
                    <Orders orders={ordersToDisplay}/>
                </Content>
            </Layout>
        </>
    )
};

export default OrganizerView;
