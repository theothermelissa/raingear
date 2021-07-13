import React, { useContext, useState, useEffect } from 'react';
import { find, matchesProperty, includes } from 'lodash';
import {RecordsContext} from '../App';
import {
    Modal,
    Card,
    Col,
    Row,
    Button,
    Descriptions
} from 'antd';

const {Meta} = Card;

const OrderDetails = () => {
    const {
        recordsDispatch,
        recordsState: {
            focusedRecord,
            fundraiserToDisplay,
            fundraiserToDisplay: {
                fundraiserName,
                fields: {
                    sellerGuardians
                }

            }
        }
    } = useContext(RecordsContext);

    // const [viewThisOrder, setViewThisOrder] = useState(find(fundraisers, matchesProperty('fundraiserID', focusedRecordID)));
    const [chosenOrder, setChosenOrder] = useState('');
    // const [viewDetails, setViewDetails] = useState(false);

    const dismissDetails = () => recordsDispatch({
        type: 'dismissRecord',
    })


    useEffect(() => {
        if (focusedRecord) {
            let sellers = [];
            sellerGuardians.map((guardian) => {
                const { fields: {
                    Sellers
                } } = guardian;
                sellers.push(...Sellers);
            });
            const thisOrdersSeller = find(sellers, matchesProperty('id', focusedRecord.seller[0]))
            setChosenOrder({
                ...focusedRecord,
                sellerRecord: thisOrdersSeller,
            });
        }
    }, [focusedRecord])
    
    // Supporter name & contact info
    // seller name & contact info
    // order product(s) & quantity
    // order status
    // no edit button
    

//     let orders = [];
//     if (orderTotals) {
//         orderTotals.map((total) => orders.push(total));
//     }

//     const relativeDeliveryDate = () => {
//         if (daysUntilDelivery > 0) {
//             return `DELIVERY IN ${daysUntilDelivery} DAYS`
//         } else if (daysUntilDelivery === 0) {
//             return "DELIVERY TODAY"
//         } return `DELIVERY WAS ${-daysUntilDelivery} DAYS AGO`
//     }

//     const totalProducts = buttCount + hamCount + turkeyCount + sauceCount;

//     function formatPhoneNumber(ph) {
//         var cleaned = ('' + ph).replace(/\D/g, '');
//         var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
//         if (match) {
//             return '(' + match[1] + ') ' + match[2] + '-' + match[3];
//         }
//         return null;
//     }

//     const prefillStatus = (currentStatus) => {
//         return (
//             currentStatus ? currentStatus : "Inquiry"
//         )
//     };

//     const showDrawer = () => {
//         recordsDispatch({
//             type: "showDrawer",
//         })
//         recordsDispatch({
//             type: "editRecord",
//             payload: recordID,
//         })
//     };

// const clickButton = () => console.log("Clicked the button. Max.")

return (
    <>
        <p>Order Status: {chosenOrder.orderStatus}</p>
        <h2>Supporter: {chosenOrder.supporterFullName}</h2>
        <p>Supporter Phone: {chosenOrder.supporterPhone}</p>
        <p>Supporter Email: {chosenOrder.supporterEmail}</p>
        <p>Order Date: {chosenOrder.date}</p>
        {chosenOrder.buttQty && <p>Butts: {chosenOrder.buttQty}</p>}
        {chosenOrder.hamQty && <p>Hams: {chosenOrder.hamQty}</p>}
        {chosenOrder.turkeyQty && <p>Turkeys: {chosenOrder.turkeyQty}</p>}
        {chosenOrder.sauceQty && <p>Sauces: {chosenOrder.sauceQty}</p>}
        <p>Seller: {chosenOrder.seller}</p>
        <h2>Total Price: {chosenOrder.totalPrice}</h2>
        {/* <Modal title="Test" visible={viewDetails} onOk={hideModal} onCancel={hideModal}> */}
            {/* <button onClick={dismissDetails}>Dismiss</button> */}
        {/* </Modal> */}
    </>
)


    // return (
    //     <div className="site-card-wrapper">
    //         <Card title={ 
    //             chosenOrder.
    //             // ? `${fundraiserName} (${prefillStatus(status)})`
    //             // : "No Name Yet"}
    //             // className={
    //             //     prefillStatus(status).toLowerCase()
    //             }
    //             style={
    //                 {
    //                     margin: "16px 0px",
    //                     padding: "0px",
    //                     backgroundColor: '#fafafa',
    //                     minWidth: "70vw",
    //                 }
    //             }
    //             extra={
    //                 <>
    //             <Button onClick={clickButton}>Edit</Button></>
    //         }>
    //             <Row type="flex"
    //                 gutter={16}>
    //                 <Col flex={"1 1 30%"}>
    //                     <Col>
    //                         <Card bordered={false}
    //                             style={
    //                                 {height: "100%"}
    //                             }
    //                             actions={
    //                                 [
    //                                     <>
    //                                         <Button disabled>Download Labels</Button>
    //                                         <Button disabled>Create Invoice</Button>
    //                                     </>
    //                                 ]
    //                         }>
    //                             <Meta title="COOK IN ______"/> It's the COO!KING!COUNT!DOWN!
    //                             {/* <Button>Download Labels</Button> */} 
    //                         </Card>
    //                         <Card bordered={false}
    //                             style={
    //                                 {height: "100%"}
    //                         }>
    //                             <Meta title="THEIR PRODUCTS"/>
    //                             <> Their products go here </>
    //                         </Card>
    //                     </Col>
    //                 </Col>
    //                 <Col flex={"1 1 30%"}
    //                     style={
    //                         {height: "100%"}
    //                 }>
    //                     <Card bordered={false}>
    //                         <Meta title={
    //                             'relativeDeliveryDate()'
    //                         }/>
    //                         <Descriptions layout={"vertical"}
    //                             column={1}>
    //                             <Descriptions.Item label="Address">
    //                                 Address me by my title, bitch
    //                                 {/* {
    //                                     deliveryAddress
    //                                     ? `${deliveryAddress}
    //                                     ${deliveryCity}, ${deliveryState} ${deliveryZip}`
    //                                     : ""
    //                                 }     */}
    //                             </Descriptions.Item>
    //                             <Descriptions.Item label="Note">
    //                                 Delivery Notesssss
    //                                 {/* {deliveryNotes} */}
    //                             </Descriptions.Item>
    //                             <Descriptions.Item label=""></Descriptions.Item>
    //                         </Descriptions>
    //                     </Card>
    //                 </Col>
    //                 <Col flex={"1 1 30%"}
    //                     style={
    //                         {height: "100%"}
    //                 }>
    //                     <Card bordered={false}
    //                         actions={
    //                             [
    //                                 <>
    //                                     <Button disabled>Reset Password</Button>
    //                                     <Button disabled>Email Contact</Button>
    //                                 </>
    //                             ]
    //                     }>
    //                         <Meta title={"Who you gonna call?"
    //                             // (contactFirstName && contactLastName)
    //                             //     ? `${
    //                             //         contactFirstName.toUpperCase()
    //                             //     } ${
    //                             //         contactLastName.toUpperCase()
    //                             //     }`
    //                             //     : "No primary contact yet"
    //                         }/>
    //                         <Descriptions 
    //                             column={1}>
    //                             <Descriptions.Item label="Phone">
    //                                 Ghost Busters
    //                                 {/* {
    //                                 formatPhoneNumber(contactPhone)
    //                                 } */}
    //                             </Descriptions.Item>
    //                             <Descriptions.Item label="Email">
    //                                 Who you gonna email? Ghost Busters
    //                                 {/* {contactEmail} */}
    //                             </Descriptions.Item>
    //                             <Descriptions.Item label="Prefers">
    //                                 But which do THEY prefer?
    //                                 {/* {contactPreferredMethod} */}
    //                             </Descriptions.Item>
    //                             <Descriptions.Item label="Address">
    //                                 Who you gonna mail? GHOST BUSTERS
    //                                 {/* {
    //                                     contactAddress
    //                                     ? `${contactAddress} ${contactAddressLine2}
    //                                     ${contactCity}, ${contactState} ${contactZip}`
    //                                     : ""
    //                                 } */}
    //                             </Descriptions.Item>
    //                         </Descriptions>
    //                     </Card>
    //                     <Card bordered={false}>
    //                         <Meta title={
    //                             "Firehouse Profit prob shouldn't be in this one"
    //                             // `FIREHOUSE PROFIT: $${firehouseFee}`
    //                         }/>
    //                         <Descriptions column={1}>
    //                             <Descriptions.Item label="Their Paid Orders">
    //                                 {
    //                                     'How many orders'
    //                                 // orders.length
    //                             }</Descriptions.Item>
    //                             <Descriptions.Item label="Their Proceeds">${
    //                                 'How much they have made'
    //                                 // organizationProceeds.toFixed(2)
    //                             }</Descriptions.Item>
    //                             <Descriptions.Item label=""></Descriptions.Item>
    //                         </Descriptions>
    //                     </Card>
    //                 </Col>
    //             </Row>
    //         </Card>

    //     </div>
    // );
};

export default OrderDetails;
