import React, {useContext, useState, useEffect} from 'react';
import {Layout} from 'antd';
import FundraiserTimeline from './FundraiserTimeline';
import AllFundraisers from './AllFundraisers';
import FundraiserDetails from './FundraiserDetails';
import {RecordsContext} from '../App';
import {find, matchesProperty} from 'lodash';

const {Sider, Content} = Layout;

const ProviderView = ({fundraisers}) => {
    const {recordsDispatch, recordsState} = useContext(RecordsContext);
    const [focusedFundraiser, setFocusedFundraiser] = useState('');

    useEffect( () => { 
        setFocusedFundraiser(
          find(fundraisers, matchesProperty('recordID', recordsState["focusedRecordID"])))
      }, [recordsState["focusedRecordID"], fundraisers]);

    const setHovered = (id) => {
        recordsDispatch({type: 'setHovered', payload: id})
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
                    {
                    fundraisers[0] && <FundraiserTimeline setHovered={setHovered}
                        fundraisers={fundraisers}/>
                } </Sider>
            </Layout>
            <Layout className="site-layout" style={{ marginLeft: 0 }}>
                <Content style={{ overflow: 'initial', minHeight: "100vh" }}>
                  {fundraisers[0] && 
                    <>
                      <AllFundraisers fundraisers={fundraisers} />
                      <div style={{ height: "300px" }}>
                      </div>
                    </>
                  }
                  {focusedFundraiser && <FundraiserDetails recordToDisplay={focusedFundraiser}/>}
                  <span style={{ height: "100px" }}/>
                </Content>
            </Layout>
        </>
    )
};

export default ProviderView;
