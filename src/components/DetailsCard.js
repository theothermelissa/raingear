import React from 'react';
import {
    Card,
    Button,
    Row,
    Col,
    Descriptions
} from 'antd';

const {Meta} = Card;

const DetailsCard = ({ record, showDrawer }) => {
    // const {
    //     id,
    //     fields: {
    //         fundraiserName,
    //         status,
    //         relativeDeliveryDate,
    //         totalProducts,
    //         buttCount,
    //         hamCount,
    //         turkeyCount,
    //         sauceCount,
    //         customerButtPrice,
    //         customerHamPrice,
    //         customerSaucePrice,
    //         customerTurkeyPrice,
    //         deliveryAddress,
    //         deliveryCity,
    //         deliveryNotes,
    //         deliveryState,
    //         deliveryZip,
    //         contactAddress,
    //         contactAddressLine2,
    //         contactCity,
    //         contactEmail,
    //         contactFirstName,
    //         contactLastName,
    //         contactPhone,
    //         contactPreferredMethod,
    //         contactState,
    //         contactZip,
    //         firehouseFee,
    //         orders,
    //         organizationProceeds   
    //     }
    // } = record

    return (
        <div style={{marginTop: "100px"}}>Foo</div>
        // <div className='site-card-wrapper'>
        //     <Card
        //         title={fundraiserName}
        //         className={status}
        //         style={
        //             {
        //                 margin: "16px 0px",
        //                 padding: "0px",
        //                 backgroundColor: '#fafafa',
        //                 minWidth: "70vw",
        //             }
        //         }
        //         extra={
        //             <Button onClick={showDrawer(id)}>Edit</Button>
        //         }>
        //             <Row
        //                 type="flex"
        //                 gutter={16}>
        //                 <Col flex={"1 1 30%"}>
        //                     <Col>
        //                         <Card
        //                             bordered={false}
        //                             style={
        //                                 {height: '100%'}
        //                             }
        //                             actions={
        //                                 [
        //                                     <>
        //                                         <Button disabled>Download Labels</Button>
        //                                         <Button disabled>Create Invoice</Button>
        //                                     </>
        //                                 ]
        //                             }
        //                         >
        //                             <Meta title={`COOK IN ${relativeDeliveryDate}`} /> {
        //                                 totalProducts > 0
        //                                     ? <>
        //                                         <div>
        //                                             {buttCount >0 && `${buttCount} Butt${
        //                                                 buttCount >1 ? 's' : ''
        //                                             }`}
        //                                         </div>
        //                                         <div>
        //                                             {hamCount >0 && `${hamCount} Ham${
        //                                                 hamCount >1 ? 's' : ''
        //                                             }`}
        //                                         </div>
        //                                         <div>
        //                                             {turkeyCount >0 && `${turkeyCount} Turkey${
        //                                                 turkeyCount >1 ? 's' : ''
        //                                             }`}
        //                                         </div>
        //                                         <div>
        //                                             {sauceCount >0 && `${sauceCount} Sauce${
        //                                                 sauceCount >1 ? 's' : ''
        //                                             }`}
        //                                         </div>
        //                                     </>
        //                                     : <div>
        //                                         No sales yet
        //                                     </div>
        //                             }
        //                         </Card>
        //                         <Card
        //                             bordered={false}
        //                             style={
        //                                 {height: '100%'}
        //                             }
        //                         >
        //                             <Meta title="THEIR PRODUCTS" />
        //                             <> {
        //                                 customerButtPrice && <div>Boston Butts @ ${customerButtPrice}</div>
        //                             }
        //                                 {
        //                                 customerHamPrice && <div>Half Hams @ ${customerHamPrice}</div>
        //                             }
        //                                 {
        //                                 customerTurkeyPrice && <div>Whole Turkeys @ ${customerTurkeyPrice}</div>
        //                             }
        //                                 {
        //                                 customerSaucePrice && <div>BBQ Sauces @ ${customerSaucePrice}</div>
        //                             } </>
        //                         </Card>
        //                     </Col>
        //                 </Col>
        //                 <Col
        //                     flex={"1 1 30%"}
        //                     style={
        //                         {height: '100%'}
        //                     }>
        //                     <Card bordered={false}>
        //                         <Meta title={
        //                             relativeDeliveryDate
        //                         }/>
        //                         <Descriptions layout={"vertical"}
        //                             column={1}>
        //                             <Descriptions.Item label="Address">
        //                                 {
        //                                     deliveryAddress
        //                                     ? `${deliveryAddress}
        //                                     ${deliveryCity}, ${deliveryState} ${deliveryZip}`
        //                                     : ""
        //                                 }    
        //                             </Descriptions.Item>
        //                             <Descriptions.Item label="Note">
        //                                 {deliveryNotes}</Descriptions.Item>
        //                             <Descriptions.Item label=""></Descriptions.Item>
        //                         </Descriptions>
        //                     </Card>
        //                 </Col>
        //                 <Col flex={"1 1 30%"}
        //                     style={
        //                         {height: "100%"}
        //                     }
        //                 >
        //                     <Card bordered={false}
        //                         actions={
        //                             [
        //                                 <>
        //                                     <Button disabled>Reset Password</Button>
        //                                     <Button disabled>Email Contact</Button>
        //                                 </>
        //                             ]
        //                     }>
        //                         <Meta title={
        //                             (contactFirstName && contactLastName)
        //                                 ? `${
        //                                     contactFirstName.toUpperCase()
        //                                 } ${
        //                                     contactLastName.toUpperCase()
        //                                 }`
        //                                 : "No primary contact yet"
        //                         }/>
        //                         <Descriptions 
        //                             column={1}>
        //                             <Descriptions.Item label="Phone">
        //                                 {
        //                                 contactPhone
        //                             }</Descriptions.Item>
        //                             <Descriptions.Item label="Email">
        //                                 {contactEmail}</Descriptions.Item>
        //                             <Descriptions.Item label="Prefers">
        //                                 {contactPreferredMethod}</Descriptions.Item>
        //                             <Descriptions.Item label="Address">
        //                                 {
        //                                     contactAddress
        //                                     ? `${contactAddress} ${contactAddressLine2}
        //                                     ${contactCity}, ${contactState} ${contactZip}`
        //                                     : ""
        //                                 }
        //                             </Descriptions.Item>
        //                         </Descriptions>
        //                     </Card>
        //                     <Card bordered={false}>
        //                         <Meta title={
        //                             `FIREHOUSE PROFIT: $${firehouseFee}`
        //                         }/>
        //                         <Descriptions column={1}>
        //                             <Descriptions.Item label="Their Paid Orders">
        //                                 {
        //                                 orders.length
        //                             }</Descriptions.Item>
        //                             <Descriptions.Item label="Their Proceeds">${
        //                                 organizationProceeds.toFixed(2)
        //                             }</Descriptions.Item>
        //                             <Descriptions.Item label=""></Descriptions.Item>
        //                         </Descriptions>
        //                     </Card>
        //                 </Col>
        //             </Row>
        //         </Card>
        // </div>
    )
};

export default DetailsCard;