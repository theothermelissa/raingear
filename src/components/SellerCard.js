import React, {useState} from 'react';
// import 'antd/dist/antd.css';
import {Button} from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const SellerCard = ({ seller, setHighlight, removeHighlight }) => {

    const [copied, setCopied] = useState(false);

    const { 
        fields: {
            Nickname: nickname,
            "Total Orders": totalOrders,
            "Total Sales Volume": totalSalesVolume,
            "Contact Email": contactEmail,
            "Contact Phone": contactPhone,
            "Orders": orders,
            "SellerStorefrontURL": sellerLink,
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
            <CopyToClipboard text={sellerLink}>
                <Button onClick={() => setCopied(true)}>{copied ? "Copied" : "Copy Link"}</Button>
            </CopyToClipboard>
            {/* <a href={createEmailLink(contactEmail)}>Email</a>   */}
        </div>
    )
};

export default SellerCard;