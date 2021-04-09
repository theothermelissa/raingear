import React, { useContext, useState, useEffect, useForm } from 'react';
import { RecordsContext, base } from '../App';
import InquiryForm from './InquiryForm';
import { Form } from 'antd';
import { set } from 'lodash';
import moment from 'moment';

const CreateFundraiserInquiry = ({ fundraisers }) => {
    const { recordsDispatch, recordsState: {
        selectedDate
    } } = useContext(RecordsContext);
    const [fieldsToSave, setFieldsToSave] = useState('');
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [showEmailLink, setShowEmailLink] = useState(false);

    //user has clicked a date in the calendar
    //drawer opens with 'create inquiry' form
    //user submits form
    //drawer displays confirmation message
    //lead is emailed with link to complete their registration

    const displaySuccessMessage = () => setShowEmailLink(true);
    
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
                console.log("Saved record: ", record.getId());
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

    // useEffect(() => {
    //     if()
    // }, [])

    const saveFields = (fields) => {
        const formInputs = fields;
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
            }}
            defaultDate={selectedDate}
            onFinish={saveFields}
        />
    );

};

export default CreateFundraiserInquiry;