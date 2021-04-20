import React from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
} from 'antd';

const InquiryForm = ({initialValues, onFinish}) => {

    const [form] = Form.useForm();

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

    function disabledHours() {
        return [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            20,
            21,
            22,
            23
        ]
    };

    const selectedDateTimeFormat = 'ddd, MMM Do hh:mm';

    return (
        <div>
            <Form {...layout}
                style={
                    {width: "80%"}
                }
                form={form}
                name="control-hooks"
                initialValues={initialValues}
                onFinish={onFinish}>
                <Form.Item name="status" label="Status">
                    <Radio.Group>
                        <Radio value="Inquiry">Inquiry</Radio>
                        <Radio value="Active">Active</Radio>
                        <Radio value="Finalized">Finalized</Radio>
                        <Radio value="Delivered">Delivered</Radio>
                        <Radio value="Cancelled">Cancelled</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="deliveryDate" label="Delivery Date"
                >
                    <DatePicker showTime
                        format={selectedDateTimeFormat}
                        disabledHours={disabledHours}
                    />
                </Form.Item>
                <Form.Item name="organization" label="Organization"
                    rules={
                        [{
                                required: true,
                                message: 'Please add an Organization name'
                            }]
                }>
                    <Input/>
                </Form.Item>
                <Form.Item name="contactFirstName" label="Primary Contact First Name"
                    rules={
                        [{
                                required: true,
                                message: 'Primary Contact is required'
                            }]
                }>
                    <Input/>
                </Form.Item>
                <Form.Item name="contactLastName" label="Primary Contact Last Name"
                    rules={
                        [{
                                required: true,
                                message: 'Last name is required'
                            }]
                }>
                    <Input/>
                </Form.Item>
                <Form.Item name="contactEmail" label="Primary Contact Email"
                    rules={
                        [{
                                required: true,
                                message: 'Email is required'
                            }]
                }>
                    <Input/>
                </Form.Item>
                <Form.Item name="contactPhone" label="Primary Contact Phone"
                    rules={
                        [{
                                required: true,
                                message: 'Phone number is required'
                            }]
                }>
                    <Input/>
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
