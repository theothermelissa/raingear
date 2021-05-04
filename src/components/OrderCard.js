import React from 'react';
import 'antd/dist/antd.css';
import { format } from 'date-fns'
import selectStatusColor from './selectStatusColor';

const OrderCard = ({ order }) => {

    const convertedDate = (date) => format(new Date(date), 'MMMM dd');

    const { 
        supporterName,
        supporterPhone,
        supporterEmail,
        sellerName,
        sellerEmail,
        buttQty,
        hamQty,
        turkeyQty,
        sauceQty,
        totalPrice,
        status,
        date,
    } = order;
    
    function formatPhoneNumber(ph) {
        var cleaned = ('' + ph).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
      }

    const createEmailLink = (email) => `mailto:${email}`;

    return (
        <div style={{backgroundColor: "white", padding: "8px 8px", margin: "2px 0px", width: "200px", borderRadius: "5px" }}>
            <h2>{supporterName}</h2>
            {/* <h2 style={{ color: selectStatusColor(status), margin: 0}}>{convertedDate(deliveryDate)}</h2>
            <h3 style={{ color: "#595959", margin: 0}}>{organization}</h3>
            <div style={{color: "#595959" }}>{contactFirstName}</div>
            <div style={{color: "#595959" }}>{formatPhoneNumber(contactPhone)}</div>
            <a href={createEmailLink(contactEmail)}>Email</a>   */}
                {/* <div className="bigIcons">🐖 Butts - {buttCount > 0  ? buttCount : "0"} </div>
                <div className="bigIcons">🐷 Hams - {hamCount > 0  ? hamCount : "0"} </div>
                <div className="bigIcons">🦃 Turkeys - {turkeyCount > 0  ? turkeyCount : "0"} </div>
                <div className="bigIcons">🥫 Sauces - {sauceCount > 0  ? sauceCount : "0"} </div> */}
            {/* <Button type="contact">Button</Button> */}
            {/* <h3>{convertedDate.toDateString()}</h3> */}
            {/* <h3>{testDate.toDateString()}</h3> */}
        </div>
    )
};

export default OrderCard;