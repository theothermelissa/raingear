import React, {useContext, useState, useEffect} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, TeamOutlined} from '@ant-design/icons';
import {RecordsContext} from '../App';
import { useParams } from 'react-router';

const GuardianView = () => {
    const {recordsDispatch, recordsState: {records, fundraiserToDisplay, fundraiserToDisplay: {fields: { sellerGuardians: allSellerGuardians }}} } = useContext(RecordsContext);
    const {Sider, Content} = Layout;
    const guardianToDisplay = allSellerGuardians.filter((guardian) => guardian.fields)
    const { fields: {Sellers: sellers} } = guardianToDisplay[0];
    console.log('sellers: ', sellers);
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
                <Menu theme='dark' width='100%'>
                    <Menu.Item key='1' icon={<UserOutlined />}>
                        Seller 1
                    </Menu.Item>
                </Menu>
                </Sider>
            </Layout>
            <Layout className="site-layout" style={{ marginLeft: 0 }}>
                <Content style={{ overflow: 'initial', minHeight: "100vh" }}>
                  Stuff goes here. It's Guardian content stuff.
                  <span style={{ height: "100px" }}/>
                </Content>
            </Layout>
        </>
    )
};

export default GuardianView;