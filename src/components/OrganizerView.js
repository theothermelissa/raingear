import React, {useContext, useState, useEffect} from 'react';
import {Layout, Modal} from 'antd';
import {RecordsContext} from '../App';
import AllOrders from './AllOrders';
import OrderDetails from './OrderDetails';
import Sellers from './Sellers';
import InviteSellersButton from './InviteSellersButton';
import sketchyRedArrow from '../images/sketchyRedArrow.png';

const OrganizerView = () => {
    const {
        recordsDispatch,
        recordsState: {
            viewFocusedRecord,
            fundraiserToDisplay: {
                fundraisers: {
                    fields: {
                        sellerGuardians,
                        inviteSellersURL
                    }
                }
            }
        }
    } = useContext(RecordsContext);

    const {Sider, Content} = Layout;

    const [sellersToDisplay, setSellersToDisplay] = useState('');
    const [ordersToDisplay, setOrdersToDisplay] = useState('');
    const [recordsToHighlight, setRecordsToHighlight] = useState('');
    const [prompt, setPrompt] = useState('arrow');

    const setHighlight = (ids) => setRecordsToHighlight(ids);
    const removeHighlight = () => setRecordsToHighlight(null);
    const dismissModal = () => recordsDispatch({type: 'dismissRecord'});
    const promptSuccess = () => setPrompt("success");
    const dismissPrompt = () => setPrompt('hidden');

    useEffect(() => {
        if (sellerGuardians) {
            let allOrders = [];
            let allSellers = [];
            if (!sellersToDisplay) {
                sellerGuardians.forEach((guardian) => {
                    if (guardian.fields) {
                        const {
                            fields: {
                                Sellers: sellers
                            }
                        } = guardian;
                        if (sellers) {
                            sellers.forEach((seller) => {
                                allSellers.push(seller)
                                if (seller.fields.Orders) {
                                    seller.fields.Orders.forEach((order) => {
                                        allOrders.push(order);
                                    });
                                }
                            })
                        }
                    }
                })
                setSellersToDisplay(allSellers);
                setOrdersToDisplay(allOrders);
            }
        }
    }, [sellersToDisplay, sellerGuardians]);

    const ArrowPrompt = () => {return (
        <div style={
            {padding: "20px"}
        }>
            <img src={sketchyRedArrow}
                style={
                    {
                        maxWidth: "50px",
                        position: "relative",
                        top: "-105px",
                        left: "7px",
                        transform: "rotate(34deg)"
                    }
                }
                alt="arrow"/>
            <p style={
                {
                    display: 'inline-block',
                    position: "relative",
                    left: "5px",
                    maxWidth: "80px"
                }
            }>Click the blue button to copy the Seller Invite Link to your clipboard.</p>
        </div>
    )}
    const SuccessPrompt = (prompt) => {return (
        <div style={
            {padding: "20px"}
        }>
            <p style={
                {
                    display: 'inline-block',
                    position: "relative",
                    left: "10px",
                    maxWidth: "150px"
                }
            }>Link copied! Now you can paste it into a message to all your sellers.</p>
        </div>
    )}
    
    const ActionPrompt = () => {
        if (sellersToDisplay.length) return null;
        switch(prompt) {
            case "hidden" :
                return null;
            case "arrow" : 
                return <ArrowPrompt />;
            case "success" :
                return <SuccessPrompt />;
            default:
                return null;
        };
    }
    
    return (
        <>
            <Layout>
                <Sider width="auto" className="site-layout-background"
                    style={
                        {
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            backgroundColor: '#d9d9d9'
                        }
                }>
                    <Sellers sellers={sellersToDisplay}
                        setHighlight={setHighlight}
                        removeHighlight={removeHighlight}/>
                    <InviteSellersButton promptSuccess={promptSuccess}
                        dismissPrompt={dismissPrompt}
                        link={inviteSellersURL}/> {
                    <ActionPrompt />
                } </Sider>
            </Layout>
            <Layout>
                <Content style={
                    {
                        overflow: 'initial',
                        minHeight: '100vh'
                    }
                }>
                    <AllOrders orders={ordersToDisplay}
                        recordsToHighlight={recordsToHighlight}/>
                    <Modal title="Order Information"
                        visible={viewFocusedRecord}
                        onOK={dismissModal}
                        onCancel={dismissModal}
                        footer={null}>
                        <OrderDetails style={
                            {paddingLeft: '100px'}
                        }/>
                    </Modal>
                </Content>
            </Layout>
        </>
    )
};

export default OrganizerView;
