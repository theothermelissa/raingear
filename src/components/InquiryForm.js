import React, { useContext, useState, useEffect, useForm } from 'react';
import { RecordsContext, base } from '../App';
import { Form, Input, InputNumber, Button, Select, Radio, DatePicker, Space } from 'antd';
import moment from 'moment';
// import { get } from 'lodash';

const InquiryForm = ({ initialValues, onFinish, defaultDate }) => {
    const {recordsDispatch, recordsState: {
        recordToEdit,
        drawerVisible,
    }} = useContext(RecordsContext);    
    
    const [form] = Form.useForm();

    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    function onOk(value) {
        console.log('onOk: ', value);
    }

    // const {Option} = Select;
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

    // const closeDrawer = () => recordsDispatch({
    //     type: "closeDrawer",
    // });

    // console.log("moment formula: ", moment().add(1, 'days').hours(11).startOf('hour'))

    function disabledHours() {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 21, 22, 23]
    };

    const selectedDateTimeFormat = 'ddd, MMM Do hh:mm';

    // console.log("Displaying the form")

    return (
        <div>
            <Form {...layout}
                style={{ width: "80%" }}
                form={form}
                name="control-hooks"
                initialValues={initialValues}
                onFinish={onFinish}
            >
                <Form.Item name="status" label="Status">
                    <Radio.Group>
                        <Radio value="Inquiry">Inquiry</Radio>
                        <Radio value="Active">Active</Radio>
                        <Radio value="Finalized">Finalized</Radio>
                        <Radio value="Delivered">Delivered</Radio>
                        <Radio value="Cancelled">Cancelled</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="deliveryDate" label="Delivery Date">
                    <Space direction="vertical" size={12}>
                        <DatePicker
                            showTime
                            format={selectedDateTimeFormat}
                            onChange={onChange}
                            onOk={onOk} 
                            disabledHours={disabledHours}
                            defaultValue={defaultDate}
                        />
                    </Space>
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
                    name="contactEmail"
                    label="Primary Contact Email">
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="contactPhone"
                    label="Primary Contact Phone">
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
};

export default InquiryForm;
