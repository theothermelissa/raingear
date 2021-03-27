import React, { useState, useContext } from 'react';
import { RecordsContext } from '../App';

const FundraiserDetails = (fundraiser) => {
    const {
        recordsDispatch, recordsState: {
            focusedRecord
        }
    } = useContext(RecordsContext);

    // const {
    //     fundraiser: {
    //         Organization,
    //     }
    // } = fundraiser;
    // console.log('Fundraiser: ', fundraiser);


    return (
        <>
            {/* <div>{JSON.stringify(fundraiser.fundraiser.Organization)}</div> */}
            <div>{JSON.stringify(focusedRecord)}</div>
        </>
    );
};

export default FundraiserDetails;