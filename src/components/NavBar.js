import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Row, Col } from 'antd/lib';
import { Avatar, Dropdown, Form, Input, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import LoginButton from './LoginButton';
import firehouseLogo from '../images/firehouseLogo.png';
import { RecordsContext } from '../App';

const{ Header } = Layout;

const NavBar = () => {
  const { recordsState: { user: { picture } } } = useContext(RecordsContext);
  const [form] = Form.useForm();
  const { Option } = Select;

  const accountMenu = (
    <Menu>
      <Menu.Item key="0">
        <Form>

        </Form>
        {/* <a target="_blank" rel="noopener noreferrer" href="/">
          View Another Fundraiser
        </a> */}
      </Menu.Item>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" href="/">
          Edit Your Profile
        </a>
      </Menu.Item>
    </Menu>
  )

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
              <img className="headerLogo" src={firehouseLogo} alt="Firehouse Logo" style={{ height: "50px", width: "auto" }} />
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
                  <Menu.Item
                    style={{ float: "right" }}
                    key="5"
                  >
                    {picture  
                      ? <Dropdown overlay={accountMenu} placement="bottomCenter" >
                          <Avatar src={<img src={picture} />} onClick={() => console.log("clicked")} />
                        </Dropdown>
                      : <Avatar icon={<UserOutlined />} />
                    }
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