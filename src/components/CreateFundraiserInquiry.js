import React, { useContext, useState, useEffect, useForm } from 'react';
import { RecordsContext, base } from '../App';
import InquiryForm from './InquiryForm';
import { Form } from 'antd';
import { set } from 'lodash';
import moment from 'moment';

const CreateFundraiserInquiry = () => {
    const { recordsDispatch, recordsState: {
        selectedDate
    } } = useContext(RecordsContext);
    const [fieldsToSave, setFieldsToSave] = useState('');
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    
    useEffect(() => {
        if (readyToSubmit) {
            base('Fundraisers').create([
                {
                "fields": fieldsToSave
                },
            ], function(err, records) {
                if (err) {
                console.error(err);
                return;
                }
                records.forEach(function (record) {
                });
            });
            recordsDispatch({
                type: "updateRecords",
            });
            recordsDispatch({
                type: "closeDrawer",
            })
        }
    }, ([readyToSubmit, fieldsToSave]));

    const saveFields = (fields) => {
        const formInputs = fields;
        console.log("fields: ", fields);
        const formattedDate = moment(fields["deliveryDate"]).toISOString();
        set(formInputs, 'deliveryDate', formattedDate);
        setFieldsToSave(formInputs);
        setReadyToSubmit(true);
    };

    const [form] = Form.useForm();
    
    return (
        <InquiryForm 
            initialValues={{
                // "organization": "This Is a Test",
                "status": "Inquiry",
                "deliveryDate": selectedDate,
            }}
            // defaultDate={selectedDate}
            onFinish={saveFields}
        />
    );

};

export default CreateFundraiserInquiry;