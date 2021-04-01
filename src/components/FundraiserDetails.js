import React, { useContext } from 'react';
import {RecordsContext} from '../App';
import {
    Card,
    Col,
    Row,
    Button,
    Descriptions
} from 'antd';

const {Meta} = Card;

const FundraiserDetails = ({ recordToDisplay }) => {
    const {
        recordsDispatch,
    } = useContext(RecordsContext);


    const {
        fundraiserName,
        organization,
        products,
        deliveryCity,
        deliveryAddress,
        deliveryState,
        deliveryZip,
        deliveryNotes,
        deliveryDate,
        daysUntilDelivery,
        contactFirstName,
        contactPhone,
        contactLastName,
        contactAddress,
        contactAddressLine2,
        contactCity,
        contactState,
        contactZip,
        contactPreferredMethod,
        contactEmail,
        status,
        buttCount,
        hamCount,
        turkeyCount,
        sauceCount,
        customerButtPrice,
        customerHamPrice,
        customerTurkeyPrice,
        customerSaucePrice,
        firehouseFee,
        orderTotals,
        totalRevenue,
        sellerRecords,
        organizationProceeds,
        recordID,
    } = recordToDisplay;

    let orders = [];
    if (orderTotals) {
        orderTotals.map((total) => orders.push(total));
    }
    let sellers = 0;
    if (sellerRecords) {
        sellers = sellerRecords.length
    };

    const relativeDeliveryDate = () => {
        if (daysUntilDelivery > 0) {
            return `DELIVERY IN ${daysUntilDelivery} DAYS`
        } return `DELIVERY WAS ${-daysUntilDelivery} DAYS AGO`
    }

    const totalProducts = buttCount + hamCount + turkeyCount + sauceCount;

    function formatPhoneNumber(ph) {
        var cleaned = ('' + ph).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }

    const showEditDrawer = () => recordsDispatch({
        type: "showEditDrawer",
        payload: recordID,
    });

    return (
        <div className="site-card-wrapper">
            <Card title={`${fundraiserName} (${status})`}
                className={
                    status.toLowerCase()
                }
                style={
                    {
                        margin: "16px 0px",
                        padding: "0px",
                        backgroundColor: '#fafafa'
                    }
                }
                extra={
                    <>
                <Button onClick={() => showEditDrawer()}>Edit</Button></>
            }>
                <Row type="flex"
                    gutter={16}>
                    <Col flex={"1 1 30%"}>
                        <Col>
                            <Card bordered={false}
                                style={
                                    {height: "100%"}
                                }
                                actions={
                                    [
                                        <>
                                            <Button disabled>Download Labels</Button>
                                            <Button disabled>Create Invoice</Button>
                                        </>
                                    ]
                            }>
                                <Meta title="COOK IN ______"/> {
                                totalProducts > 0 ? <>
                                    <div>{
                                        buttCount > 0 && `${buttCount} Butt${
                                            buttCount > 1 ? 's' : ''
                                        }`
                                    }</div>
                                    <div>{
                                        hamCount > 0 && `${hamCount} Ham${
                                            hamCount > 1 ? 's' : ''
                                        }`
                                    }</div>
                                    <div>{
                                        turkeyCount > 0 && `${turkeyCount} Turkey${
                                            turkeyCount > 1 ? 's' : ''
                                        }`
                                    }</div>
                                    <div>{
                                        sauceCount > 0 && `${sauceCount} Sauce${
                                            sauceCount > 1 ? 's' : ''
                                        }`
                                    }</div>
                                </> : <div>No sales yet</div>
                            }
                                {/* <Button>Download Labels</Button> */} </Card>
                            <Card bordered={false}
                                style={
                                    {height: "100%"}
                            }>
                                <Meta title="THEIR PRODUCTS"/>
                                <> {
                                    customerButtPrice && <div>Boston Butts @ ${customerButtPrice}</div>
                                }
                                    {
                                    customerHamPrice && <div>Half Hams @ ${customerHamPrice}</div>
                                }
                                    {
                                    customerTurkeyPrice && <div>Whole Turkeys @ ${customerTurkeyPrice}</div>
                                }
                                    {
                                    customerSaucePrice && <div>BBQ Sauces @ ${customerSaucePrice}</div>
                                } </>
                            </Card>
                        </Col>
                    </Col>
                    <Col flex={"1 1 30%"}
                        style={
                            {height: "100%"}
                    }>
                        <Card bordered={false}
                            actions={
                                [
                                    <>
                                        <Button disabled>Get Directions</Button>
                                    </>
                                ]
                        }>
                            {/* <Meta title={`DELIVERY SCHEDULED FOR: ${convertedDate(deliveryDate).toUpperCase()}`} /> */}
                            <Meta title={
                                relativeDeliveryDate()
                            }/>
                            <Descriptions layout={"vertical"}
                                column={1}>
                                <Descriptions.Item label="Address">
                                    {deliveryAddress}<br/>{deliveryCity}, {deliveryState}
                                    {deliveryZip}</Descriptions.Item>
                                <Descriptions.Item label="Note">
                                    {deliveryNotes}</Descriptions.Item>
                                <Descriptions.Item label=""></Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                    <Col flex={"1 1 30%"}
                        style={
                            {height: "100%"}
                    }>
                        <Card bordered={false}
                            actions={
                                [
                                    <>
                                        <Button disabled>Reset Password</Button>
                                        <Button disabled>Email Contact</Button>
                                    </>
                                ]
                        }>
                            {/* <Meta title={`DELIVERY SCHEDULED FOR: ${convertedDate(deliveryDate).toUpperCase()}`} /> */}
                            <Meta title={
                                `${
                                    contactFirstName.toUpperCase()
                                } ${
                                    contactLastName.toUpperCase()
                                }`
                            }/>
                            <Descriptions 
                                // layout={"vertical"}
                                column={1}>
                                <Descriptions.Item label="Phone">
                                    {
                                    formatPhoneNumber(contactPhone)
                                }</Descriptions.Item>
                                <Descriptions.Item label="Email">
                                    {contactEmail}</Descriptions.Item>
                                <Descriptions.Item label="Prefers">
                                    {contactPreferredMethod}</Descriptions.Item>
                                <Descriptions.Item label="Address">
                                    {contactAddress}
                                    {contactAddressLine2}<br/>{contactCity}, {contactState}
                                    {contactZip}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                        <Card bordered={false}>
                            <Meta title={
                                `FIREHOUSE PROFIT: $${firehouseFee}`
                            }/>
                            <Descriptions column={1}>
                                <Descriptions.Item label="Their Paid Orders">
                                    {
                                    orders.length
                                }</Descriptions.Item>
                                <Descriptions.Item label="Their Proceeds">${
                                    organizationProceeds.toFixed(2)
                                }</Descriptions.Item>
                                <Descriptions.Item label=""></Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                </Row>
            </Card>

        </div>
    );
};

export default FundraiserDetails;
