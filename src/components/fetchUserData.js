import React from 'react';
import {base} from '../App';
import recordsReducer from '../reducers/recordsReducer';
import { createFilterFormula, arrayify } from './getRecordsFunctions';

export const getUser = (email, callback) => {
    base('Users').select({
        filterByFormula: createFilterFormula([email], 'Email')
    })
    .all()
    .then((users) => {
        const {
            fields,
            fields: {
                allFundraisers
            }
        } = users[0];
        const usersFundraiserList = arrayify(allFundraisers)
        const roleInfo = usersFundraiserList.map((id) => {
            return ({
                'role': 'pending',
                'fundraiserID': id
            });
        });
        callback({
            ...fields,
            'roleInfo': roleInfo
        })
    });
}