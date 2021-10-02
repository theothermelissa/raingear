import React, { useContext, useState, useEffect } from 'react';
import { find, matchesProperty, isObjectLike } from 'lodash';
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
            recordHasChanged,
            fundraiserToDisplay: {
                fundraisers
            },
            focusedRecord
        }
    } = useContext(RecordsContext);

    const [viewThisFundraiser, setViewThisFundraiser] = useState(find(fundraisers, matchesProperty('id', focusedRecord.toString())));

    useEffect(() => {
        if (fundraisers) {
            let fullFundraiserRecord = find(fundraisers, matchesProperty('id', focusedRecord));
            setViewThisFundraiser(fullFundraiserRecord);
        }
    }, [fundraisers, focusedRecord, recordHasChanged])


    const {
        fields: {
            fundraiserName,
            deliveryCity,
            deliveryAddress,
            deliveryState,
            deliveryZip,
            deliveryNotes,
            daysUntilDelivery,
            daysUntilCook,
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
            standardCount,
            premiumCount,
            buttCount,
            hamCount,
            turkeyCount,
            sauceCount,
            customerStandardPrice,
            customerPremiumPrice,
            customerButtPrice,
            customerHamPrice,
            customerTurkeyPrice,
            customerSaucePrice,
            providerFee,
            orderTotals,
            organizationProceeds,
            recordID,
        }
    } = viewThisFundraiser;

    let orders = [];
    if (orderTotals) {
        orderTotals.map((total) => orders.push(total));
    }

    const relativeDate = (days, event) => {
        // console.log("Days to cook: ", days);
        if (isObjectLike(days)) {
            return `NO ${event} DATE YET`
        }
        if (days > 0) {
            return `${event} IN ${days} DAYS`
        } else if (days === 0) {
            return `${event} TODAY`
        } return `${event} WAS ${-days} DAYS AGO`
    }

    const totalProducts = buttCount + hamCount + turkeyCount + sauceCount + standardCount + premiumCount;

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
                                <Meta title={relativeDate(daysUntilCook, "COOK")}/> {
                                    totalProducts > 0 
                                        ? <>
                                            <div>{
                                                standardCount > 0 && `${standardCount} Standard Crate${
                                                    standardCount > 1 ? 's' : ''
                                                }`
                                            }</div>
                                            <div>{
                                                premiumCount > 0 && `${premiumCount} Premium Crate${
                                                    premiumCount > 1 ? 's' : ''
                                                }`
                                            }</div>
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
                                    customerStandardPrice && <div>Standard Crates @ ${customerStandardPrice}</div>
                                }
                                {
                                    customerPremiumPrice && <div>Premium Crates @ ${customerPremiumPrice}</div>
                                }
                                {
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
                                relativeDate(daysUntilDelivery, "DELIVERY")
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
                                {deliveryNotes && <Descriptions.Item label="Note">
                                    {deliveryNotes}
                                </Descriptions.Item>}
                                <Descriptions.Item label="">
                                </Descriptions.Item>
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
                                `FIREHOUSE PROFIT: $${providerFee}`
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
