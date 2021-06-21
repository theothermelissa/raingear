import React, { useState, useEffect, useContext } from 'react';
import 'antd/dist/antd.css';
// import { format } from 'date-fns'
// import selectStatusColor from './selectStatusColor';

const SellerCard = ({ seller, setHighlight, removeHighlight }) => {

    const { 
        id,
        fields: {
            Nickname: nickname,
            Email: email,
            Phone: phone,
            AddressLine1: addressLine1,
            AddressLine2: addressLine2,
            City: city,
            State: state,
            Zip: zip,
            Supporters: supporters,
            SellerGuardian: guardian,
            "Email (from SellerGuardian)": guardianEmail,
            "Phone (from SellerGuardian)": guardianPhone,
            "AddressLine1 (from SellerGuardian)": guardianAddressLine1,
            "AddressLine2 (from SellerGuardian)": guardianAddressLine2,
            "City (from SellerGuardian)": guardianCity,
            "State (from SellerGuardian)": guardianState,
            "Zip (from SellerGuardian)": guardianZip,
            "Link to Order From This Seller": orderFormLink,
            "Total Orders": totalOrders,
            "Total Sales Volume": totalSalesVolume,
            "Contact Email": contactEmail,
            "Contact Phone": contactPhone,
            "Contact Address": contactAddress,
            "Contact Address Line 2": contactAddressLine2,
            "Contact City": contactCity,
            "Contact State": contactState,
            "Contact Zip": contactZip,
            "Orders": orders,
        }
    } = seller;
    
    function formatPhoneNumber(ph) {
        var cleaned = ('' + ph).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }

    const createOrderList = () => {
        if (orders) {
            return orders.map((order) => order.id)
        }
    }

    const createEmailLink = (email) => `mailto:${email}`;

    return (
        <div 
            onMouseEnter={() => setHighlight(createOrderList(orders))} 
            onMouseLeave={() => removeHighlight()} 
            style={{
                backgroundColor: "white",
                margin: "10px",
                padding: "8px",
                width: "250px",
                borderRadius: "5px",
                boxShadow: "1px 2px 9px #9E9E9E" 
            }}
        >
            {/* <h2 style={{ color: selectStatusColor(status), margin: 0}}>{convertedDate(deliveryDate)}</h2> */}
            <h3 style={{ color: "darkred", margin: 0}}><b>{nickname}</b></h3>
            <div style={{color: "#595959" }}>{formatPhoneNumber(contactPhone)}</div> 
            <a href={createEmailLink(contactEmail)}>{contactEmail}</a>
            <h4>{totalOrders} Sales | Total raised: {totalSalesVolume}</h4>
            {/* <a href={createEmailLink(contactEmail)}>Email</a>   */}
        </div>
    )
};

export default SellerCard;