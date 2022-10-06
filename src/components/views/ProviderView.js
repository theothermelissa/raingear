import React, {useContext, useState} from 'react';
import {Layout} from 'antd';
import FundraiserTimeline from '../FundraiserTimeline';
import AllFundraisers from '../AllFundraisers';
import FundraiserDetails from '../FundraiserDetails';
import {RecordsContext} from '../../App';

const {Sider, Content} = Layout;

const ProviderView = () => {
    const { recordsState: {
        viewFocusedRecord,
        fundraiserToDisplay: {
            fundraisers
        },
    } } = useContext(RecordsContext);
    const [hoveredFundraiser, setHoveredFundraiser] = useState('');

    const setHovered = (id) => {
        setHoveredFundraiser(id);
    };

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
                    <FundraiserTimeline setHovered={setHovered} />
                </Sider>
            </Layout>
            <Layout className="site-layout" style={{ marginLeft: 0 }}>
                <Content style={
                        { 
                            overflow: 'initial',
                            minHeight: "100vh" 
                        }
                    }>
                    <>
                      {fundraisers && <AllFundraisers hoveredFundraiser={hoveredFundraiser} />}
                      <div style={{height: "300px"}}>
                      </div>
                    </>
                  {viewFocusedRecord && <FundraiserDetails />}
                  <span style={{ height: "100px" }} />
                </Content>
            </Layout>
        </>
    )
};

export default ProviderView;
