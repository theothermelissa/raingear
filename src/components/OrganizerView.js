import React, {useContext, useState, useEffect} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, TeamOutlined} from '@ant-design/icons';
import {RecordsContext} from '../App';
import Orders from './Orders';
import Sellers from './Sellers';

const OrganizerView = () => {
    const {
        recordsDispatch,
        recordsState: {
            whichDataIsLoaded,
            fundraiserToDisplay: {
                fields: fundraiserFields,
                fields: {
                    sellerGuardians,
                }
            }
        }
    } = useContext(RecordsContext);
    const {Sider, Content} = Layout;
    
    //sidebar on left with list of sellers
    //table on right with list of orders
    
    const [sellersToDisplay, setSellersToDisplay] = useState('');
    const [ordersToDisplay, setOrdersToDisplay] = useState('');
    const [selectedSeller, setSelectedSeller] = useState('');

    // const totalGuardians = sellerGuardians.length;
    // const totalSellers = sellerGuardians.map((guardian) => guardian.fields.Sellers.length);
    // const totalOrders = 

    
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
                    const { fields: {
                        Sellers: sellers,
                    } } = guardian;
                    if (sellers) {
                        // totalSellers = sellers.length;
                        // console.log("totalSellers: ", totalSellers);
                        // if (totalSellers === sellersRetrieved && totalOrders === ordersRetrieved) {
                            // setSellersToDisplay(allSellers);
                            // setOrdersToDisplay(allOrders);
                            // return;
                        // };
                        sellers.map((seller) => {
                            console.log("seller in OrganizerView: ", seller);
                            allSellers.push(seller)
                            if (seller.fields.Orders) {
                                // totalOrders = totalOrders + seller.fields.Orders.length;
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
                    <Sellers sellers={sellersToDisplay} />
                </Sider>
            </Layout>
            <Layout>
                <Content style={{ overflow: 'initial', minHeight: '100vh'}}>
                    Here are the orders: {JSON.stringify(ordersToDisplay)}
                </Content>
            </Layout>
        </>
    )
};

export default OrganizerView;