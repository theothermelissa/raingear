import React, {useState, useContext, useEffect} from 'react';
import { RecordsContext } from '../App';
import {find, matchesProperty} from 'lodash';
import { Layout,Button } from 'antd';
import {format} from 'date-fns';
import {anyOfThese} from './getRecordsFunctions';

const SellerView = ({ sellerIDs }) => {
    const { recordsState: {
        fundraiserToDisplay: {
            fields: {
                sellerGuardians,
                deliveryDate,
                deliveryAddress,
                deliveryCity,
                deliveryState,
                deliveryZip
            }
        }
    } } = useContext(RecordsContext);
    const {Content} = Layout;

    const [orderLink, setOrderLink] = useState('');
    const [nickname, setNickname] = useState('');
    const [totalOrders, setTotalOrders] = useState('');
    const [totalSalesVolume, setTotalSalesVolume] = useState('');
    
    const formattedDate = (date) => format(new Date(date), 'MMM dd');

    useEffect(() => {
        if (sellerGuardians) {
            sellerGuardians.forEach((guardian) => {
                const { fields: { Sellers }} = guardian;
                if (Sellers) {
                    const thisSellersRecord = find(Sellers, matchesProperty('id', anyOfThese(sellerIDs)))
                    const { fields: {
                        Nickname: nickname,
                        "Total Orders": totalOrders,
                        "Total Sales Volume": totalSalesVolume,
                        "Link to Order From This Seller": orderLink,
                    }} = thisSellersRecord;
                    setOrderLink(orderLink);
                    setNickname(nickname);
                    setTotalOrders(totalOrders);
                    setTotalSalesVolume(`$${totalSalesVolume}`);
                }
            })
        }
    }, [sellerGuardians, sellerIDs])

    return (
        <Layout>
            <Content style={{ overflow: 'initial', minHeight: '100vh'}}>
                <h1>Welcome, {nickname}!</h1>
                <br></br>
                <Button href={orderLink}>Place an Order</Button>
                <br></br>
                <br></br>
                <div>Orders: {totalOrders}</div>
                <div>Total raised: {totalSalesVolume}</div>
                <br></br>
                <h3>Delivery scheduled for: {formattedDate(deliveryDate)}</h3>
                <div>{deliveryAddress}</div>
                <div>{deliveryCity}, {deliveryState} {deliveryZip}</div>
            </Content>
        </Layout>

    )
};

export default SellerView;