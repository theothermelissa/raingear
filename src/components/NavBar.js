import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Row, Col } from 'antd/lib';
import { Dropdown } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import LoginButton from './LoginButton';
import firehouseLogo from '../images/firehouseLogo.png';
import { RecordsContext } from '../App';

const{ Header } = Layout;

const NavBar = () => {
  const {
    recordsDispatch,
    recordsState: {
      user,
      // user: {
      //   picture
      // },
      fundraiserToDisplay: {
        role
      },
      records
    }
  } = useContext(RecordsContext);

  const chooseFundraiser = (record) => {
    recordsDispatch({
      type: 'setFundraiserToDisplay',
      payload: {
        role: record.role,
        fundraisers: {...record}
      }
    })
  };

  const fundraiserMenu = (
    <Menu>
      {records && records.map((fundraiser, fundraiserIndex) => {
        return (
          <Menu.Item key={`${fundraiser.id}${fundraiserIndex}`}>
            <div key={fundraiser.fundraiserName} onClick={() => chooseFundraiser(fundraiser)}>{fundraiser.fields.fundraiserName}</div>
          </Menu.Item>
        )
      })
      }
    </Menu>
  )

  // const accountMenu = (
  //   <Menu>
  //     <Menu.Item key="viewAnotherFundraiser">
  //       <Form>
  //       <a target="_blank" rel="noopener noreferrer" href="/">
  //         View Another Fundraiser
  //       </a>
  //       </Form> 
  //     </Menu.Item>
  //     <Menu.Item key="editYourProfile">
  //       <a target="_blank" rel="noopener noreferrer" href="/">
  //         Edit Your Profile
  //       </a>
  //     </Menu.Item>
  //   </Menu>
  // )

    return (
        <>
          <Row justify="end">
            <Header 
                style={{ 
                position: "fixed",
                display: "flex",
                zIndex: 1000,
                width: '100%',
                breakpoint: 'lg',
                }}
            >
              <img
                className="headerLogo"
                src={firehouseLogo}
                alt="Firehouse Logo"
                style={{
                  height: "50px",
                  width: "auto"
                  }}
              />
              <Col flex={6} >
                    { (role === "provider") ?
                    <Menu theme="dark" mode="horizontal">
                      <Menu.Item style={{ float: "left" }} key="fundraiser">
                        {user && <NavLink to="/">
                          Fundraisers
                        </NavLink> }
                      </Menu.Item> 
                      <Menu.Item style={{ float: "left" }} key="calendar">
                        <NavLink to="/calendar">
                          Calendar
                        </NavLink>
                      </Menu.Item>
                    </Menu>
                    :
                    // <div>Provider</div> :
                    <Menu theme="dark" mode="horizontal">
                      <Menu.Item style={{ float: "left" }} key="fundraiser">
                        {user && <Dropdown overlay={fundraiserMenu} placement="bottomCenter" >
                          <div>Fundraisers</div>
                        </Dropdown>}
                      </Menu.Item> 
                    </Menu>
                    }
                    
              </Col>
              <Col >
                <Menu theme="dark" mode="horizontal">
                  <Menu.Item 
                    style={{ float: "right" }}
                    key="login">
                    <LoginButton />
                  </Menu.Item>
                  {/* <Menu.Item
                    style={{ float: "right" }}
                    key="avatar"
                  >
                    {picture  
                      ? <Dropdown overlay={accountMenu} placement="bottomCenter" >
                          <Avatar src={<img src={picture} />} onClick={() => console.log("clicked")} />
                        </Dropdown>
                      : <Avatar icon={<UserOutlined />} />
                    }
                  </Menu.Item> */}
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