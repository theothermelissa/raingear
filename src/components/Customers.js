import React, { useContext } from 'react';
import { RecordsContext } from '../App';
import CreateFundraiser from './CreateFundraiser';
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
            <CreateFundraiser date={moment()} />
        </>
    )
};

export default Customers;