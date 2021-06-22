import React, { useContext, useState, useEffect } from 'react';
import { find, matchesProperty } from 'lodash';
import {RecordsContext} from '../App';
import {
    Card,
    Col,
    Row,
    Button,
    Descriptions
} from 'antd';

const {Meta} = Card;

const FundraiserDetails = () => {
    const {
        recordsDispatch,
        recordsState: {
            fundraiserToDisplay: {
                fundraisers
            },
            focusedRecordID,
        }
    } = useContext(RecordsContext);

    const [viewThisFundraiser, setViewThisFundraiser] = useState(find(fundraisers, matchesProperty('fundraiserID', focusedRecordID)));

    useEffect(() => {
        if (fundraisers) {
            let fullFundraiserRecord = find(fundraisers, matchesProperty('fundraiserID', focusedRecordID));
            setViewThisFundraiser(fullFundraiserRecord);
        }
    }, [fundraisers])


    const {
        fields: {
            fundraiserName,
            deliveryCity,
            deliveryAddress,
            deliveryState,
            deliveryZip,
            deliveryNotes,
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
            organizationProceeds,
            recordID,
        }
    } = viewThisFundraiser;

    let orders = [];
    if (orderTotals) {
        orderTotals.map((total) => orders.push(total));
    }

    const relativeDeliveryDate = () => {
        if (daysUntilDelivery > 0) {
            return `DELIVERY IN ${daysUntilDelivery} DAYS`
        } else if (daysUntilDelivery === 0) {
            return "DELIVERY TODAY"
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

    const prefillStatus = (currentStatus) => {
        return (
            currentStatus ? currentStatus : "Inquiry"
        )
    };

    const showDrawer = () => {
        recordsDispatch({
            type: "showDrawer",
        })
        recordsDispatch({
            type: "editRecord",
            payload: recordID,
        })
    };

    return (
        <div className="site-card-wrapper">
            <Card title={ fundraiserName
                ? `${fundraiserName} (${prefillStatus(status)})`
                : "No Name Yet"}
                className={
                    prefillStatus(status).toLowerCase()
                }
                style={
                    {
                        margin: "16px 0px",
                        padding: "0px",
                        backgroundColor: '#fafafa',
                        minWidth: "70vw",
                    }
                }
                extra={
                    <>
                <Button onClick={() => showDrawer()}>Edit</Button></>
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
                                    totalProducts > 0 
                                        ? <>
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
                                        </>
                                        : <div>
                                            No sales yet
                                        </div>
                                }
                                {/* <Button>Download Labels</Button> */} 
                            </Card>
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
                        <Card bordered={false}>
                            <Meta title={
                                relativeDeliveryDate()
                            }/>
                            <Descriptions layout={"vertical"}
                                column={1}>
                                <Descriptions.Item label="Address">
                                    {
                                        deliveryAddress
                                        ? `${deliveryAddress}
                                        ${deliveryCity}, ${deliveryState} ${deliveryZip}`
                                        : ""
                                    }    
                                </Descriptions.Item>
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
                            <Meta title={
                                (contactFirstName && contactLastName)
                                    ? `${
                                        contactFirstName.toUpperCase()
                                    } ${
                                        contactLastName.toUpperCase()
                                    }`
                                    : "No primary contact yet"
                            }/>
                            <Descriptions 
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
                                    {
                                        contactAddress
                                        ? `${contactAddress} ${contactAddressLine2}
                                        ${contactCity}, ${contactState} ${contactZip}`
                                        : ""
                                    }
                                </Descriptions.Item>
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
