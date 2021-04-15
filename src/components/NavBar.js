import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd/lib';

const{ Header } = Layout
console.log("Header: ", Header)

const NavBar = () => {
    return (
        <>
            <Header 
                style={{ 
                position: "fixed",
                zIndex: 1000,
                width: '100%' 
                }}
            >
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1">
                  <NavLink to="/">
                    Home
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                  <NavLink to="/calendar">
                    Calendar
                  </NavLink>
                </Menu.Item>
            </Menu>
          </Header>
          <div style={{ height: "64px" }}>
          </div>
        </>
    )
};

export default NavBar;