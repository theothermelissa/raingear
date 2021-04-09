import React, { useContext } from 'react';
import { RecordsContext } from '../App';
import CreateFundraiserInquiry from './CreateFundraiserInquiry';
import moment from 'moment';

const Customers = () => {
    const { recordsDispatch, recordsState } = useContext(RecordsContext);

    const showDrawer = () => recordsDispatch({
        type: "showDrawer",
    });

    return (
        <>
            <div style={{ height: "100vh" }}>This is a list of customers.</div>
            <button onClick={showDrawer}></button>
            <CreateFundraiserInquiry date={moment()} />
        </>
    )
};

export default Customers;