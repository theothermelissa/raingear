import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Row, Col } from 'antd/lib';
import LoginButton from './LoginButton';

const{ Header } = Layout;

const NavBar = () => {
    return (
        <>
          <Row justify="end">
            <Header 
                style={{ 
                position: "fixed",
                display: "flex",
                zIndex: 1000,
                width: '100%' 
                }}
            >
              <Col flex={6} >
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item style={{ float: "left" }} key="1">
                      <NavLink to="/">
                        Fundraisers
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item style={{ float: "left" }} key="3">
                      <NavLink to="/calendar">
                        Calendar
                      </NavLink>
                    </Menu.Item>
                </Menu>
              </Col>
              <Col flex={1}>
                <Menu theme="dark" mode="horizontal">
                  <Menu.Item 
                    style={{ float: "right" }}
                    key="4">
                    <LoginButton />
                  </Menu.Item>
                </Menu>
              </Col>
            </Header>
          </Row>
          <div style={{ height: "64px" }}>
          </div>
        </>
    )
};

export default NavBar;