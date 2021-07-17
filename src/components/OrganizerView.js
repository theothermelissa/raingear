import React, {useContext, useState, useEffect} from 'react';
import {Layout, Modal} from 'antd';
import {RecordsContext} from '../App';
import AllOrders from './AllOrders';
import OrderDetails from './OrderDetails';
import Sellers from './Sellers';
import InviteSellersButton from './InviteSellersButton';

const OrganizerView = () => {
    const {
        recordsDispatch,
        recordsState,
        recordsState: {
            viewFocusedRecord,
            fundraiserToDisplay,
            fundraiserToDisplay:
                { fundraisers: {
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
                } }
            }
    } = useContext(RecordsContext);
    console.log("recordsState.fundraiserToDisplay.fundraisers.fields.sellerGuardians in OrganizerView: ", recordsState.fundraiserToDisplay.fundraisers.fields.sellerGuardians)
    console.log('sellerGuardians in OrganizerView: ', sellerGuardians)

    const {Sider, Content} = Layout;

    const [sellersToDisplay, setSellersToDisplay] = useState('');
    const [ordersToDisplay, setOrdersToDisplay] = useState('');
    const [recordsToHighlight, setRecordsToHighlight] = useState('');

    const setHighlight = (ids) => setRecordsToHighlight(ids);
    const removeHighlight = () => setRecordsToHighlight(null);
    const dismissModal = () => recordsDispatch({
        type: 'dismissRecord',
    })
    
//     //sets Sellers and Orders to display
    useEffect(() => {
        // const { fundraisers: {fields, fields: { sellerGuardians }} } = fundraiserToDisplay;
        const relevantFundraisers = fundraiserToDisplay.fundraisers;
        const firstFundRaiser = relevantFundraisers;
        const relevantFields = firstFundRaiser.fields;
        const sellerGuardians = relevantFields.sellerGuardians;


        // const sellerGuardians = fundraiserToDisplay.fundraisers[0]['fields']['sellerGuardians'];
        // console.log('sellerGuardians in OrganizerView: ', sellerGuardians);
        if (sellerGuardians) {
            let allOrders = [];
            let allSellers = [];
            // console.log("sellerGuardians in OrganizerView: ", sellerGuardians);
            if (!sellersToDisplay) {
                sellerGuardians.map((guardian) => {
                    console.log("guardian in OrganizerView: ", JSON.stringify(guardian));
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
    }, [sellerGuardians]);

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
