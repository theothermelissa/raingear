import React, { useContext, useState, useEffect, useForm } from 'react';
import {RecordsContext, base} from '../App';
import {Form, Input, InputNumber, Button, Select, Radio} from 'antd';
import { get } from 'lodash';

const EditFundraiser = () => {
    const {recordsDispatch, recordsState: {
            recordToEdit,
            editDrawerVisible,
        }} = useContext(RecordsContext);
    const [existingValues, setExistingValues] = useState()
    
    
    const [form] = Form.useForm();
    
    
    useEffect(() => {
        base('Fundraisers').find(recordToEdit, function (err, record) {
            if (record["fields"]["status"]) {
                setExistingValues(record["fields"]);
            } else {
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
                    } = record["fields"];
                setExistingValues({
                    "fundraiserName": fundraiserName,
                    "organization": organization,
                    "products": products,
                    "deliveryCity": deliveryCity,
                    "deliveryAddress": deliveryAddress,
                    "deliveryState": deliveryState,
                    "deliveryZip": deliveryZip,
                    "deliveryNotes": deliveryNotes,
                    "deliveryDate": deliveryDate,
                    "daysUntilDelivery": daysUntilDelivery,
                    "contactFirstName": contactFirstName,
                    "contactPhone": contactPhone,
                    "contactLastName": contactLastName,
                    "contactAddress": contactAddress,
                    "contactAddressLine2": contactAddressLine2,
                    "contactCity": contactCity,
                    "contactState": contactState,
                    "contactZip": contactZip,
                    "contactPreferredMethod": contactPreferredMethod,
                    "contactEmail": contactEmail,
                    "status": "Inquiry",
                    "buttCount": buttCount,
                    "hamCount": hamCount,
                    "turkeyCount": turkeyCount,
                    "sauceCount": sauceCount,
                    "customerButtPrice": customerButtPrice,
                    "customerHamPrice": customerHamPrice,
                    "customerTurkeyPrice": customerTurkeyPrice,
                    "customerSaucePrice": customerSaucePrice,
                    "firehouseFee": firehouseFee,
                    "orderTotals": orderTotals,
                    "totalRevenue": totalRevenue,
                    "sellerRecords": sellerRecords,
                    "organizationProceeds": organizationProceeds,
                    "recordID": recordID,
                })
            }
            if (err) {
                console.error(err);
                return;
                }
            })
    }, []);

    // useEffect(() => {
    //     form.setFieldsValue(existingValues)
    // }, [form, existingValues])


    // const {
    //     fundraiserName,
    //     organization,
    //     products,
    //     deliveryCity,
    //     deliveryAddress,
    //     deliveryState,
    //     deliveryZip,
    //     deliveryNotes,
    //     deliveryDate,
    //     daysUntilDelivery,
    //     contactFirstName,
    //     contactPhone,
    //     contactLastName,
    //     contactAddress,
    //     contactAddressLine2,
    //     contactCity,
    //     contactState,
    //     contactZip,
    //     contactPreferredMethod,
    //     contactEmail,
    //     status,
    //     buttCount,
    //     hamCount,
    //     turkeyCount,
    //     sauceCount,
    //     customerButtPrice,
    //     customerHamPrice,
    //     customerTurkeyPrice,
    //     customerSaucePrice,
    //     firehouseFee,
    //     orderTotals,
    //     totalRevenue,
    //     sellerRecords,
    //     organizationProceeds,
    //     recordID,
    // } = existingValues;


    const {Option} = Select;
    const layout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16
        }
    };


    // const onGenderChange = (value) => {
    //     switch (value) {
    //         case 'male':
    //             form.setFieldsValue({note: 'Hi, man!'});
    //             return;

    //         case 'female':
    //             form.setFieldsValue({note: 'Hi, lady!'});
    //             return;

    //         case 'other':
    //             form.setFieldsValue({note: 'Hi there!'});
    //     }
    // };

    const closeEditDrawer = () => recordsDispatch({
        type: "closeEditDrawer",
      });
    
    const onFinish = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const submitRecordChanges = (values) => {
        base('Fundraisers').update([
            {
                "id": recordToEdit,
                "fields": values,
            }
        ], function(err, records) {
            if (err) {
                console.log("Error: ", err);
                return;
            }
        });
        recordsDispatch({
            type: "updateRecords",
        });
        closeEditDrawer();
    };

    function getExistingValues() {
        return existingValues;
    }
    // console.log("existingValues: ", existingValues);

    // const existingValues = {"organization": "Orange Octagon", "buttPrice": 55}

    // const get()

    return (
        <div>
            {existingValues && <Form {...layout}
                style={{ width: "80%" }}
                // {...layout}
                form={form}
                name="control-hooks"
                initialValues={getExistingValues()}
                // initialValues={{
                //     'organization': "This Is Not The Organization",
                // }}
                onFinish={submitRecordChanges}
            >
                <Form.Item name="status" label="Status">
                    {/* <Select placeholder="Change Status" allowClear>
                        <Option value="Inquiry">Inquiry</Option>
                        <Option value="Active">Active</Option>
                        <Option value="Finalized">Finalized</Option>
                        <Option value="Delivered">Delivered</Option>
                        <Option value="Cancelled">Cancelled</Option>
                    </Select> */}
                    <Radio.Group>
                        <Radio value="Inquiry">Inquiry</Radio>
                        <Radio value="Active">Active</Radio>
                        <Radio value="Finalized">Finalized</Radio>
                        <Radio value="Delivered">Delivered</Radio>
                        <Radio value="Cancelled">Cancelled</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="deliveryAddress" label="Delivery Address">
                    <Input />
                </Form.Item>
                <Form.Item name="deliveryCity" label="Delivery City">
                    <Input />
                </Form.Item>
                <Form.Item name="deliveryState" label="Delivery State">
                    <Input />
                </Form.Item>
                <Form.Item name="deliveryZip" label="Delivery Zip">
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="organization"
                    label="Organization">
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="contactFirstName"
                    label="Primary Contact First Name">
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="contactLastName"
                    label="Primary Contact Last Name">
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="contactAddress"
                    label="Primary Contact Address">
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="contactAddressLine2"
                    label="Primary Contact Address Line 2">
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="contactCity"
                    label="Primary Contact City">
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="contactState"
                    label="Primary Contact State">
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="contactZip"
                    label="Primary Contact Zip">
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="contactPreferredMethod"
                    label="Preferred Contact Method">
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="contactEmail"
                    label="Primary Contact Email">
                    <Input />
                </Form.Item>
                <Form.Item name="products" label="Products" rules={ [{ type: 'array' }] }>
                    <Select mode="multiple" placeholder="Edit Products" allowClear>
                        <Option value="Boston Butts">Boston Butts</Option>
                        <Option value="Half Hams">Half Hams</Option>
                        <Option value="Whole Turkeys">Whole Turkeys</Option>
                        <Option value="BBQ Sauce">BBQ Sauce</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="firehouseButtPrice" label="Firehouse Butt Price">
                    <InputNumber 
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Form.Item name="firehouseHamPrice" label="Firehouse Ham Price">
                    <InputNumber 
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Form.Item name="firehouseTurkeyPrice" label="Firehouse Turkey Price">
                    <InputNumber 
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Form.Item name="firehouseSaucePrice" label="Firehouse Sauce Price">
                    <InputNumber 
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Form.Item name="customerButtPrice" label="Customer Butt Price">
                    <InputNumber 
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Form.Item name="customerHamPrice" label="Customer Ham Price">
                    <InputNumber 
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Form.Item name="customerTurkeyPrice" label="Customer Turkey Price">
                    <InputNumber 
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Form.Item name="customerSaucePrice" label="Customer Sauce Price">
                    <InputNumber 
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    {/* <Button htmlType="button"
                        onClick={onReset}>
                        Reset
                    </Button> */}
                </Form.Item>
            </Form>}
        </div>

    )
};

export default EditFundraiser;
