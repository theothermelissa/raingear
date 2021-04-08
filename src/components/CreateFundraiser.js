import React, { useContext, useState, useEffect, useForm } from 'react';
import { RecordsContext, base } from '../App';
import FundraiserForm from './FundraiserForm';
import { Form } from 'antd';
import { set } from 'lodash';
import moment from 'moment';

const CreateFundraiser = (date) => {
    const { recordsDispatch, recordsState: {
        selectedDate
    } } = useContext(RecordsContext);
    // const [selectedDate, setSelectedDate] = useState('');
    const [fieldsToSave, setFieldsToSave] = useState('');
    const [readyToSubmit, setReadyToSubmit] = useState(false);

    console.log("selectedDate: ", selectedDate);
    // const tomorrow = moment();
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
                type: "closeDrawer",
            })
        }
    }, ([readyToSubmit, fieldsToSave]))

//     var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
//      _.set(object, 'a[0].b.c', 4);

    const saveFields = (fields) => {
        const formInputs = fields;
        const formattedDate = moment(fields["deliveryDate"]).toISOString();
        // console.log("formattedDate: ", formattedDate);
        set(formInputs, 'deliveryDate', formattedDate);
        console.log("formInputs: ", formInputs);
        setFieldsToSave(formInputs);
        setReadyToSubmit(true);
    };

    const [form] = Form.useForm();
    
    return (
        <FundraiserForm 
            initialValues={{
                // "organization": "This Is a Test",
                "status": "Inquiry",
            }}
            defaultDate={selectedDate}
            onFinish={saveFields}
        />
    );

};

export default CreateFundraiser;