import React, {useContext, useState, useEffect} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, TeamOutlined} from '@ant-design/icons';
import {RecordsContext} from '../App';
import Customers from './Customers';

const GuardianView = () => {
    const {
        recordsDispatch,
        recordsState: {
            whichDataIsLoaded,
            fundraiserToDisplay: {
                fields: {
                    sellerGuardians: allSellerGuardians
                }
            }
        }
    } = useContext(RecordsContext);
    const {Sider, Content} = Layout;
    const [currentGuardian, setCurrentGuardian] = useState('');
    const [sellers, setSellers] = useState('');
    const [allSellersLoaded, setAllSellersLoaded] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState('');

    useEffect(() => {
        if (whichDataIsLoaded === 'all' && allSellerGuardians) {
                if (!currentGuardian) {
                    setCurrentGuardian((allSellerGuardians.filter((guardian) => guardian.fields)[0]))
                } else if (!sellers) {
                    setSellers(currentGuardian.fields.Sellers);
                } else if (sellers[0]) {
                    setAllSellersLoaded(true)
                };
            }
    }, [allSellerGuardians, whichDataIsLoaded, currentGuardian, sellers]);

    const selectSeller = (id) => {
        setSelectedSeller(id);
    };
    
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
                        backgroundColor: '#d9d9d9'
                    }
                }
                width="auto"
                className="site-layout-background">
                <Menu theme='dark' width='100%'>
                    {sellers.map((seller) => {
                        return (<Menu.Item key={seller.id} icon={<UserOutlined onClick={() => selectSeller(seller.id)} />}>
                            {seller.fields.Nickname}
                        </Menu.Item>)
                    })
                    }
                </Menu>
                </Sider>
            </Layout>
            <Layout className="site-layout" style={{ marginLeft: 0 }}>
                <Content style={{ overflow: 'initial', minHeight: "100vh" }}>
                    <Customers guardian={currentGuardian.id} seller={selectedSeller}/>
                <span style={{ height: "100px" }}/>
                </Content>
            </Layout>
        </>
        }
        </>
    )
};

export default GuardianView;