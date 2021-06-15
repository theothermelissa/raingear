import React, {useContext, useState, useEffect} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, TeamOutlined} from '@ant-design/icons';
import {RecordsContext} from '../App';

const OrganizerView = () => {
    const {
        recordsDispatch,
        recordsState
    } = useContext(RecordsContext);
    const {Sider, Content} = Layout;

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
                    <div>This is the sider.</div>
                </Sider>
            </Layout>
            <Layout>
                <Content style={{ overflow: 'initial', minHeight: '100vh'}}>
                    This is the organizer content.
                </Content>
            </Layout>
        </>
    )
};

export default OrganizerView;