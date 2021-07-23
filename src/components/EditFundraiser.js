import React, {useContext, useState, useEffect} from 'react';
import {RecordsContext, base} from '../App';
import FundraiserForm from './FundraiserForm';
import moment from 'moment';

const EditFundraiser = () => {
    const {recordsDispatch, recordsState: {
            recordToEdit
        }} = useContext(RecordsContext);
    const [existingValues, setExistingValues] = useState("")

    useEffect(() => {
        if (recordToEdit) {
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
                        recordID
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
                        "recordID": recordID
                    })
                }
                if (err) {
                    console.error(err);
                    return;
                }
            })
        }
    }, [recordToEdit]);

    const closeDrawer = () => recordsDispatch({type: "closeDrawer"});

    const submitRecordChanges = (values) => {
        base('Fundraisers').update([
            {
                "id": recordToEdit,
                "fields": values
            }
        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
        });
        recordsDispatch({
            type: "updateRecords",
        });
        closeDrawer();
    };

    function getExistingValues() {
        return existingValues;
    }

    return (
        <> {
            existingValues && <FundraiserForm initialValues={
                    getExistingValues()
                }
                onFinish={submitRecordChanges}
                defaultDate={
                    moment(existingValues["deliveryDate"])
                }/>
        } </>
    )
};

export default EditFundraiser;
