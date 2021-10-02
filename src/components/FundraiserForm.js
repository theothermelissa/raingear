import React from 'react';
import {
    Form,
    Input,
    InputNumber,
    Button,
    Select,
    Radio,
    DatePicker,
    Space
} from 'antd';

const FundraiserForm = ({initialValues, onFinish, defaultDate}) => {
    const [form] = Form.useForm();

    // function onChange(value, dateString) {
    //     console.log('Selected Time: ', value);
    //     console.log('Formatted Selected Time: ', dateString);
    // }

    // function onOk(value) {
    //     console.log('onOk: ', value);
    // }

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
                <Form.Item name="deliveryDate" label="Delivery Date">
                    <Space direction="vertical"
                        size={12}>
                        <DatePicker showTime
                            format={selectedDateTimeFormat}
                            // onChange={onChange}
                            // onOk={onOk}
                            disabledHours={disabledHours}
                            value={defaultDate}/>
                    </Space>
                </Form.Item>
                <Form.Item name="organization" label="Organization">
                    <Input/>
                </Form.Item>
                <Form.Item name="deliveryAddress" label="Delivery Address">
                    <Input/>
                </Form.Item>
                <Form.Item name="deliveryCity" label="Delivery City">
                    <Input/>
                </Form.Item>
                <Form.Item name="deliveryState" label="Delivery State">
                    <Input/>
                </Form.Item>
                <Form.Item name="deliveryZip" label="Delivery Zip">
                    <Input/>
                </Form.Item>
                <Form.Item name="contactFirstName" label="Primary Contact First Name">
                    <Input/>
                </Form.Item>
                <Form.Item name="contactLastName" label="Primary Contact Last Name">
                    <Input/>
                </Form.Item>
                <Form.Item name="contactAddress" label="Primary Contact Address">
                    <Input/>
                </Form.Item>
                <Form.Item name="contactAddressLine2" label="Primary Contact Address Line 2">
                    <Input/>
                </Form.Item>
                <Form.Item name="contactCity" label="Primary Contact City">
                    <Input/>
                </Form.Item>
                <Form.Item name="contactState" label="Primary Contact State">
                    <Input/>
                </Form.Item>
                <Form.Item name="contactZip" label="Primary Contact Zip">
                    <Input/>
                </Form.Item>
                <Form.Item name="contactPreferredMethod" label="Preferred Contact Method">
                    <Input/>
                </Form.Item>
                <Form.Item name="contactEmail" label="Primary Contact Email">
                    <Input/>
                </Form.Item>
                <Form.Item name="products" label="Products"
                    rules={
                        [{
                                type: 'array'
                            }]
                }>
                    <Select mode="multiple" placeholder="Edit Products" allowClear>
                        <Option value="Boston Butts">Boston Butts</Option>
                        <Option value="Half Hams">Half Hams</Option>
                        <Option value="Whole Turkeys">Whole Turkeys</Option>
                        <Option value="BBQ Sauce">BBQ Sauce</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="firehouseButtPrice" label="Firehouse Butt Price">
                    <InputNumber formatter={
                            value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={
                            value => value.replace(/\$\s?|(,*)/g, '')
                        }/>
                </Form.Item>
                <Form.Item name="firehouseHamPrice" label="Firehouse Ham Price">
                    <InputNumber formatter={
                            value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={
                            value => value.replace(/\$\s?|(,*)/g, '')
                        }/>
                </Form.Item>
                <Form.Item name="firehouseTurkeyPrice" label="Firehouse Turkey Price">
                    <InputNumber formatter={
                            value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={
                            value => value.replace(/\$\s?|(,*)/g, '')
                        }/>
                </Form.Item>
                <Form.Item name="firehouseSaucePrice" label="Firehouse Sauce Price">
                    <InputNumber formatter={
                            value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={
                            value => value.replace(/\$\s?|(,*)/g, '')
                        }/>
                </Form.Item>
                <Form.Item name="customerButtPrice" label="Customer Butt Price">
                    <InputNumber formatter={
                            value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={
                            value => value.replace(/\$\s?|(,*)/g, '')
                        }/>
                </Form.Item>
                <Form.Item name="customerHamPrice" label="Customer Ham Price">
                    <InputNumber formatter={
                            value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={
                            value => value.replace(/\$\s?|(,*)/g, '')
                        }/>
                </Form.Item>
                <Form.Item name="customerTurkeyPrice" label="Customer Turkey Price">
                    <InputNumber formatter={
                            value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={
                            value => value.replace(/\$\s?|(,*)/g, '')
                        }/>
                </Form.Item>
                <Form.Item name="customerSaucePrice" label="Customer Sauce Price">
                    <InputNumber formatter={
                            value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={
                            value => value.replace(/\$\s?|(,*)/g, '')
                        }/>
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

export default FundraiserForm;
