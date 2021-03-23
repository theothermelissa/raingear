import React, { useState, useEffect } from 'react';

const FundraiserCard = ({ fundraiser }) => {

    const { ["Organization"]: org, ["Delivery Date"]: deliveryDate } = fundraiser;
    // let deliveryTime = new Date(record.get('Delivery Date'));
    // let days = Math.round((deliveryTime - now) / (1000 * 60 * 60 * 24));
    // console.log("fields: ", fields);
    return (
        <div>
            <h1>{org}</h1>
            <h1>{deliveryDate}</h1>
        </div>
    )
};

export default FundraiserCard;