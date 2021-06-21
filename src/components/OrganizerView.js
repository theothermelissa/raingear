import React, {useContext, useState, useEffect} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, TeamOutlined} from '@ant-design/icons';
import {find, matchesProperty} from 'lodash';
import {RecordsContext, HighlightContext} from '../App';
import Orders from './Orders';
import Sellers from './Sellers';

const OrganizerView = () => {
    const {
        recordsDispatch,
        recordsState: {
            whichDataIsLoaded,
            hoveredIDs,
            fundraiserToDisplay: {
                id,
                fields: fundraiserFields,
                fields: {
                    sellerGuardians,
                    fundraiserName,
                    organization,
                    deliveryDate,
                    deliveryAddress,
                    deliveryCity,
                    deliveryState,
                    deliveryZip,
                    deliveryNotes,
                    products,
                    customerButtPrice,
                    customerHamPrice,
                    customerTurkeyPrice,
                    customerSaucePrice,
                    orders,
                    contactFirstName,
                    contactLastName,
                    contactEmail,
                    contactPhone,
                    recordID,
                    sellers,
                    orderCount,
                    inviteSellersURL,
                    status,
                    buttCount,
                    hamCount,
                    turkeyCount,
                    sauceCount,
                    organizationProceeds
                }
            }
        }
    } = useContext(RecordsContext);

    const {
        highlightState: {
            highlightedRecordIDs,
        },
        highlightDispatch
    } = useContext(HighlightContext);

    const {Sider, Content} = Layout;

    const [sellersToDisplay, setSellersToDisplay] = useState('');
    const [ordersToDisplay, setOrdersToDisplay] = useState('');
    const [recordsToHighlight, setRecordsToHighlight] = useState('');

    const setHighlight = (ids) => setRecordsToHighlight(ids);
    const removeHighlight = () => setRecordsToHighlight(null);

    useEffect(() => {
        if (sellerGuardians) {
            let allOrders = [];
            let allSellers = [];
            if (!sellersToDisplay) {
                    sellerGuardians.map((guardian) => {
                        const {
                            fields: {
                                Sellers: sellers
                            }
                        } = guardian;
                        if (sellers) {
                            sellers.map((seller) => {
                                allSellers.push(seller)
                                if (seller.fields.Orders) { 
                                    seller.fields.Orders.map((order) => {
                                        allOrders.push(order);
                                    });
                                }
                            })
                        }
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
                    <Sellers sellers={sellersToDisplay} setHighlight={setHighlight} removeHighlight={removeHighlight} />
                </Sider>
            </Layout>
            <Layout>
                <Content style={
                    {
                        overflow: 'initial',
                        minHeight: '100vh'
                    }
                }>
                    <Orders orders={ordersToDisplay} recordsToHighlight={recordsToHighlight}/>
                </Content>
            </Layout>
        </>
    )
};

export default OrganizerView;
