import React, {useContext, useState, useEffect} from 'react';
import {Layout} from 'antd';
import Orders from './Orders';
import {RecordsContext} from '../App';
import {find, matchesProperty} from 'lodash';
import AllSellers from './AllSellers';

const OrganizerView = () => {
    const {recordsDispatch, recordsState} = useContext(RecordsContext);
    const {Sider, Content} = Layout;

    let orders = [{
        supporterName: "supporterName",
        supporterPhone: "supporterPhone",
        supporterEmail: "supporterEmail",
        sellerName: "sellerName",
        sellerEmail: "sellerEmail",
        buttQty: "buttQty",
        hamQty: "hamQty",
        turkeyQty: "turkeyQty",
        sauceQty: "sauceQty",
        totalPrice: "totalPrice",
        status: "status",
        date: "date",
    },{
        supporterName: "supporterName2",
        supporterPhone: "supporterPhone2",
        supporterEmail: "supporterEmail2",
        sellerName: "sellerName2",
        sellerEmail: "sellerEmail2",
        buttQty: "buttQty2",
        hamQty: "hamQty2",
        turkeyQty: "turkeyQty2",
        sauceQty: "sauceQty2",
        totalPrice: "totalPrice2",
        status: "status2",
        date: "date2",
    }];

    const setHovered = (id) => {
        recordsDispatch({type: 'setHovered', payload: id})
    };

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
                    {Orders && 
                        <Orders orders={orders} setHovered={setHovered} />
                    }
                </Sider>
            </Layout>
            <Layout className="site-layout" style={{ marginLeft: 0 }}>
                <Content style={{ overflow: 'initial', minHeight: "100vh" }}>
                    {/* {fundraisers[0] &&  */}
                        <>
                        <AllSellers />
                        <div style={{ height: "300px" }}>
                        </div>
                        </>
                    {/* } */}
                    {/* {focusedFundraiser && <FundraiserDetails recordToDisplay={focusedFundraiser}/>}
                    <span style={{ height: "100px" }}/> */}
                </Content>
            </Layout>
        </>
    )
};

export default OrganizerView;