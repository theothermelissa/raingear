import React, { useState, useContext } from 'react';
import { RecordsContext } from '../App';
import { Card, Col, Row, Button, Descriptions } from 'antd';
import { format } from 'date-fns';


const { Meta } = Card;

const FundraiserDetails = () => {
    const {
        recordsDispatch, recordsState: {
            focusedRecord,
            viewFocusedRecord,
        }
    } = useContext(RecordsContext);

    const {
        ["FundraiserName"]: fundraiserName,
        ["Organization"]: org,
        ["Delivery City"]: deliveryCity,
        ["Delivery Address"]: deliveryAddress,
        ["Delivery State"]: deliveryState,
        ["Delivery Zip"]: deliveryZip,
        ["Delivery Notes"]: deliveryNotes,
        ["Delivery Date"]: deliveryDate,
        ["Days Until Delivery"]: daysUntilDelivery,
        ["Primary Contact First Name"]: contactFirstName,
        ["Primary Phone"]: contactPhone,
        ["Primary Contact Last Name"]: contactLastName,
        ["Primary Mailing Address"]: contactAddress,
        ["Primary Address Line 2"]: contactAddressLine2,
        ["Primary City"]: contactCity,
        ["Primary State"]: contactState,
        ["Primary Zip"]: contactZip,
        ["Primary Preferred Contact Method"]: contactPreferredMethod,
        ["Primary Email"]: contactEmail,
        ["Status"]: status,
        ["ButtCount"]: buttCount,
        ["HamCount"]: hamCount,
        ["TurkeyCount"]: turkeyCount,
        ["SauceCount"]: sauceCount,
        ["CustomerButtPrice"]: customerButtPrice,
        ["CustomerHamPrice"]: customerHamPrice,
        ["CustomerTurkeyPrice"]: customerTurkeyPrice,
        ["CustomerSaucePrice"]: customerSaucePrice,
        ["Firehouse Fee"]: firehouseFee,
        ["Totals Paid (from Orders)"]: orderTotals,
        ["Sellers"]: sellerRecords,
        ["Organization Proceeds"]: organizationProceeds,
    } = focusedRecord;

    const convertedDate = (date) => format(new Date(date), 'MMM dd');
    let orders = [];
    if(orderTotals) {
        orderTotals.map((total) => orders.push(total));
    }
    let sellers = 0;
    if(sellerRecords) {
        sellers = sellerRecords.length
    };
    
    const totalProducts = buttCount + hamCount + turkeyCount + sauceCount;

    function formatPhoneNumber(ph) {
        var cleaned = ('' + ph).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
      }
    // console.log("sellers: ", (sellers));
    // console.log("orders: ", (orders));

    // const {
    //     fundraiser: {
    //         Organization,
    //     }
    // } = fundraiser;
    // console.log('Fundraiser: ', fundraiser);


    return (
        <>
            {/* <div>{JSON.stringify(fundraiser.fundraiser.Organization)}</div> */}
            <div className="site-card-wrapper" >
                <Card 
                    title={fundraiserName}
                    className={status.toLowerCase()}
                    style={{ margin: "16px 0px", padding: "0px", backgroundColor: '#fafafa' }}
                    extra={
                        <>
                            <Button disabled>Edit</Button>
                        </>
                    }>
                    <Row type="flex" gutter={16}>
                        <Col flex={"1 1 30%"} >
                            <Col >
                                <Card
                                    bordered={false}
                                    style={{ height: "100%", }}
                                    actions={[
                                        <>
                                            <Button disabled>Download Labels</Button>
                                            <Button disabled>Create Invoice</Button>
                                        </>
                                    ]}
                                >
                                    <Meta title="COOK IN ______" />
                                    { totalProducts > 0 ?
                                        <>
                                            <div>{buttCount>0 && `${buttCount} Butt${buttCount>1 ? 's' : ''}`}</div>
                                            <div>{hamCount>0 && `${hamCount} Ham${hamCount>1 ? 's' : ''}`}</div>
                                            <div>{turkeyCount>0 && `${turkeyCount} Turkey${turkeyCount>1 ? 's' : ''}`}</div>
                                            <div>{sauceCount>0 && `${sauceCount} Sauce${sauceCount>1 ? 's' : ''}`}</div>
                                        </>
                                    :
                                        <div>No sales yet</div>
                                    }
                                    {/* <Button>Download Labels</Button> */}
                                </Card>
                                <Card bordered={false} style={{ height: "100%", }}>
                                    <Meta title="THEIR PRODUCTS" />
                                        <>
                                            {customerButtPrice && <div>Boston Butts @ ${customerButtPrice}</div>}
                                            {customerHamPrice && <div>Half Hams @ ${customerHamPrice}</div>}
                                            {customerTurkeyPrice && <div>Whole Turkeys @ ${customerTurkeyPrice}</div>}
                                            {customerSaucePrice && <div>BBQ Sauces @ ${customerSaucePrice}</div>}
                                        </>
                                </Card>
                            </Col>
                        </Col>
                        <Col flex={"1 1 30%"} style={{ height: "100%", }}>
                            <Card 
                                bordered={false}
                                actions={[ 
                                    <>
                                        <Button disabled>Get Directions</Button>
                                    </>
                                ]}>
                                {/* <Meta title={`DELIVERY SCHEDULED FOR: ${convertedDate(deliveryDate).toUpperCase()}`} /> */}
                                <Meta title={`DELIVERY IN ${daysUntilDelivery} DAYS`} />
                                <Descriptions layout={ "vertical" } column={1}>
                                    <Descriptions.Item label="Address" >{deliveryAddress}<br />{deliveryCity}, {deliveryState} {deliveryZip}</Descriptions.Item>
                                    <Descriptions.Item label="Note" >{deliveryNotes}</Descriptions.Item>
                                    <Descriptions.Item label="" ></Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Col>
                        <Col flex={"1 1 30%"} style={{ height: "100%", }} >
                            <Card bordered={false} actions={[ 
                            <>
                                <Button disabled>Reset Password</Button>
                                <Button disabled>Email Contact</Button>
                            </>]}>
                                {/* <Meta title={`DELIVERY SCHEDULED FOR: ${convertedDate(deliveryDate).toUpperCase()}`} /> */}
                                <Meta title={`${contactFirstName.toUpperCase()} ${contactLastName.toUpperCase()}`} />
                                <Descriptions layout={ "vertical" } column={1}>
                                    <Descriptions.Item label="Phone" >{formatPhoneNumber(contactPhone)}</Descriptions.Item>
                                    <Descriptions.Item label="Email" >{contactEmail}</Descriptions.Item>
                                    <Descriptions.Item label="Address" >{contactAddress} {contactAddressLine2}<br />{contactCity}, {contactState} {contactZip}</Descriptions.Item>
                                </Descriptions>
                            </Card>
                            <Card bordered={false}>
                                <Meta title={`FIREHOUSE PROFIT: $${firehouseFee}`} />
                                <Descriptions column={1}>
                                    <Descriptions.Item label="Their Paid Orders" >{orders.length}</Descriptions.Item>
                                    <Descriptions.Item label="Their Proceeds" >${organizationProceeds.toFixed(2)}</Descriptions.Item>
                                    <Descriptions.Item label="" ></Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Col>
                    </Row>
                </Card>
                
            </div>
        </>
    );
};

export default FundraiserDetails;