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
                    deliveryCity,
                    deliveryState,
                    deliveryZip,
                    fundraiserName,
                    contactFirstName,
                    contactLastName,
                    contactPhone,
                    contactEmail,
                }
            }
        }
    } = useContext(RecordsContext);
    const {Sider, Content} = Layout;
    const [currentGuardian, setCurrentGuardian] = useState('');
    const [sellers, setSellers] = useState('');
    const [allSellersLoaded, setAllSellersLoaded] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState('all');

    const formattedDate = (date) => format(new Date(date), 'MMMM dd');
    function formatPhoneNumber(ph) {
        var cleaned = ('' + ph).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
      }
    
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
        console.log("clicking to select seller")
        setSelectedSeller(id);
    };
    
    const sellerMenuItems = () => {
        let result = [];
        result.push(
            <Menu.Item key="allSellers" onClick={() => selectSeller("all")} icon={<TeamOutlined />}>View All Sellers</Menu.Item>
        )
        sellers.map((seller) => {
            result.push(
                <Menu.Item key={seller.id} onClick={() => selectSeller(seller.id)} icon={<UserOutlined />}>
                    {seller.fields.Nickname}
                </Menu.Item>
            )
        });
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
                        <br></br>
                        <h1 >Delivery on:</h1>
                        <h1 style={{ margin: "0px 0px -5px 0px" }} >{<b style={{ color: "darkred", fontSize: "2em" }}>{formattedDate(deliveryDate)}</b>}</h1>
                        <h2 style={{ margin: "-5px 0px" }}>{deliveryAddress}</h2>
                        <h2>{deliveryCity}, {deliveryState} {deliveryZip}</h2>
                        <br></br>
                    </div>
                    <Menu theme='dark' width='100%' defaultSelectedKeys={sellers.length > 1 ? "allSellers" : sellers[0].id}>
                        {sellers.length > 1  
                            ? sellerMenuItems()
                            : <Menu.Item key={sellers[0].id} icon={<UserOutlined onClick={() => selectSeller(sellers[0].id)} />}>
                                {sellers[0].fields.Nickname}
                            </Menu.Item>
                        }
                    </Menu>
                    <div style={{ padding: "30px 12px" }}>
                        <h1>Fundraiser Coordinator: </h1>
                        <h2 style={{ marginBottom: "-5px" }}>{contactFirstName} {contactLastName}</h2>
                        <h2>{formatPhoneNumber(contactPhone)}</h2>
                    </div>

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