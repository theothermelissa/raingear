import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import TotalRaisedCard from './TotalRaisedCard';
import TotalProductSales from './TotalProductSales';
import Sellers from './Sellers';

const OrganizerOverview = (props) => {
    const { 
        totalRaised,
        sellers,
        setHighlight,
        removeHighlight
     } = props;

    const {Panel} = Collapse;

    const text = 'Would that it were so simple.'

    return (
        <Collapse 
            accordion
            defaultActiveKey={['1']}
        >
            <Panel header="Overview" key="1">
                <TotalRaisedCard amount={totalRaised} />
                {/* <TotalProductSales /> */}
            </Panel>
            <Panel header="Sellers" key="2">
                <Sellers sellers={sellers}
                    setHighlight={setHighlight}
                    removeHighlight={removeHighlight}
                />
            </Panel>
        </Collapse>
    )
};

export default OrganizerOverview;