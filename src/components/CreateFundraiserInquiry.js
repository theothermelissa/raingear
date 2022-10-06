import React, {useContext, useState, useEffect} from 'react';
import {RecordsContext, base} from '../App';
import InquiryForm from './InquiryForm';
import {set} from 'lodash';
import moment from 'moment';

const CreateFundraiserInquiry = () => {
    const {recordsDispatch, recordsState: {
            selectedDate
        }} = useContext(RecordsContext);
    const [fieldsToSave, setFieldsToSave] = useState('');
    const [readyToSubmit, setReadyToSubmit] = useState(false);

    useEffect(() => {
        if (readyToSubmit) {
            base('Fundraisers').create([
                {
                    "fields": fieldsToSave
                },
            ], function (err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                records.forEach(function (record) {});
            });
            recordsDispatch({type: "updateRecords"});
            recordsDispatch({type: "closeDrawer"})
        }
    }, ([readyToSubmit, fieldsToSave, recordsDispatch]));

    const saveFields = (fields) => {
        const formInputs = fields;
        const formattedDate = moment(fields["deliveryDate"]).toISOString();
        set(formInputs, 'deliveryDate', formattedDate);
        setFieldsToSave(formInputs);
        setReadyToSubmit(true);
    };

    return (
        <InquiryForm initialValues={
                {
                    "status": "Inquiry",
                    "deliveryDate": selectedDate
                }
            }
            onFinish={saveFields}/>
    );

};

export default CreateFundraiserInquiry;
