import React, {useContext, useState, useEffect} from 'react';
import {Layout, Menu, Breadcrumb, Modal} from 'antd';
import {UserOutlined, TeamOutlined} from '@ant-design/icons';
import {find, matchesProperty} from 'lodash';
import {RecordsContext} from '../App';
import AllOrders from './AllOrders';
import OrderDetails from './OrderDetails';
import Sellers from './Sellers';
import InviteSellersButton from './InviteSellersButton';

const OrganizerView = () => {
    const {
        recordsDispatch,
        recordsState: {
            whichDataIsLoaded,
            hoveredIDs,
            viewFocusedRecord,
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

    const {Sider, Content} = Layout;

    const [sellersToDisplay, setSellersToDisplay] = useState('');
    const [ordersToDisplay, setOrdersToDisplay] = useState('');
    const [recordsToHighlight, setRecordsToHighlight] = useState('');

    const setHighlight = (ids) => setRecordsToHighlight(ids);
    const removeHighlight = () => setRecordsToHighlight(null);
    const dismissModal = () => recordsDispatch({
        type: 'dismissRecord',
    })

    //sets Sellers and Orders to display
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
                <Sider 
                    width="auto"
                    className="site-layout-background"
                    style={
                        {
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            backgroundColor: '#d9d9d9',
                        }
                    }
                >
                    <Sellers
                        sellers={sellersToDisplay}
                        setHighlight={setHighlight}
                        removeHighlight={removeHighlight}
                    />
                    <InviteSellersButton link={inviteSellersURL} />
                </Sider>
            </Layout>
            <Layout>
                <Content style={
                    {
                        overflow: 'initial',
                        minHeight: '100vh'
                    }
                }>
                    <AllOrders
                        orders={ordersToDisplay}
                        recordsToHighlight={recordsToHighlight}
                />
                <Modal 
                    title="Order Details"
                    visible={viewFocusedRecord}
                    onOK={dismissModal}
                    onCancel={dismissModal}
                >
                    <OrderDetails />
                </Modal>
               </Content>
            </Layout>
        </>
    )
};

export default OrganizerView;
