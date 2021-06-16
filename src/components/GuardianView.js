import React, {useContext, useState, useEffect} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, TeamOutlined} from '@ant-design/icons';
import {RecordsContext} from '../App';
import Customers from './Customers';
import {format} from 'date-fns';

const GuardianView = () => {
    const {
        recordsDispatch,
        recordsState: {
            whichDataIsLoaded,
            fundraiserToDisplay: {
                fields: {
                    sellerGuardians: allSellerGuardians,
                    deliveryDate,
                    deliveryAddress,
                    fundraiserName,
                }
            }
        }
    } = useContext(RecordsContext);
    const {Sider, Content} = Layout;
    const [currentGuardian, setCurrentGuardian] = useState('');
    const [sellers, setSellers] = useState('');
    const [allSellersLoaded, setAllSellersLoaded] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState('all');

    const formattedDate = (date) => format(new Date(date), 'MMM dd');
    
    useEffect(() => {
        if (whichDataIsLoaded === 'all' && allSellerGuardians) {
                if (!currentGuardian) {
                    setCurrentGuardian((allSellerGuardians.filter((guardian) => guardian.fields)[0]))
                } else if (!sellers) {
                    setSellers(currentGuardian.fields.Sellers);
                } else if (sellers.length === currentGuardian.fields.Sellers.length) {
                    if (sellers.length > 1) {
                        setAllSellersLoaded(true)
                    } else {
                        setAllSellersLoaded(true)
                    }
                };
            }
    }, [allSellerGuardians, whichDataIsLoaded, currentGuardian, sellers, selectedSeller]);



    const selectSeller = (id) => {
        // console.log("clicking to select seller")
        setSelectedSeller(id);
    };
    
    const sellerMenuItems = () => {
        let result = [];
        let sellerLinks = sellers.map((seller) => {
            result.push(
                <Menu.Item key={seller.id} onClick={() => selectSeller(seller.id)} icon={<UserOutlined />}>
                    {seller.fields.Nickname}
                </Menu.Item>
            )
        });
        result.push(
            <Menu.Item key="allSellers" onClick={() => selectSeller("all")} icon={<TeamOutlined />}>View All</Menu.Item>
        )
        return result;
    };
    
    // console.log("selectedSeller: ", selectedSeller)
    return (
        <>
        {allSellersLoaded && 
        <>
            <Layout>
                <Sider style={
                    {
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        backgroundColor: '#d9d9d9',
                    }
                }
                width="280px"
                className="site-layout-background">
                    <div style={{ padding: "12px" }}>
                        <h1>{fundraiserName}</h1>
                        <h1>Delivery {<b>{formattedDate(deliveryDate)}</b>}</h1>
                        <h1>@ {deliveryAddress}</h1>
                    </div>
                <Menu theme='dark' width='100%' defaultSelectedKeys={sellers.length > 1 ? "allSellers" : sellers[0].id}>
                    {sellers.length > 1  
                        ? sellerMenuItems().map((item) => item)
                        : <Menu.Item key={sellers[0].id} icon={<UserOutlined onClick={() => selectSeller(sellers[0].id)} />}>
                            {sellers[0].fields.Nickname}
                        </Menu.Item>
                    }
                </Menu>
                </Sider>
            </Layout>
            <Layout className="site-layout" >
                <Content style={{ overflow: 'initial', minHeight: "100vh", }}>
                    <Customers guardian={currentGuardian.id} sellerToView={selectedSeller}/>
                <span style={{ height: "100px" }}/>
                </Content>
            </Layout>
        </>
        }
        </>
    )
};

export default GuardianView;