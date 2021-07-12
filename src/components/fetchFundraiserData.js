import React from 'react';
import { createFilterFormula, getRecordType } from './getRecordsFunctions';
import {base} from '../App';
import {defaultGuardianRecord} from './getRecordsFunctions';
import { forEach } from 'lodash';

export const getFundraisers = (user, ids, callback) => {
    let fundraiserData = [];
    console.log('ids: ', ids)
    base('Fundraisers').select({
        filterByFormula: createFilterFormula(ids, 'recordID')
    })
    .all()
    .then((fundraisers) => {
        fundraisers.forEach((fundraiserRecord, fundraiserIndex) => {
            const { 
                id,
                fields,
                fields: {
                    sellerGuardians,
                    deliveryDate
                },
            } = fundraiserRecord;
            fundraiserData.push({
                role: getRecordType(id, user),
                id,
                fields
            });
            if (sellerGuardians) {
                base('SellerGuardians').select({
                    filterByFormula: createFilterFormula(sellerGuardians, 'GuardianID')
                })
                .all()
                .then((guardians) => {
                    guardians.forEach((guardianRecord, guardianIndex) => {
                        const {
                            id,
                            fields,
                            fields: {Sellers: sellers}
                        } = guardianRecord;
                        fundraiserData[fundraiserIndex]['fields']['sellerGuardians'][guardianIndex] = {id, fields};
                        if (sellers) {
                            base('Sellers').select({
                                filterByFormula: createFilterFormula(sellers, 'recordID')
                            })
                            .all()
                            .then((sellers) => {
                                sellers.forEach((sellerRecord, sellerIndex) => {
                                    const {
                                        id, fields, fields: {Orders: orders}
                                    } = sellerRecord;
                                    fundraiserData[fundraiserIndex]['fields']['sellerGuardians'][guardianIndex]['fields']['Sellers'][sellerIndex] = {id, fields}
                                    if (orders) {
                                        base('Orders').select({
                                            filterByFormula: createFilterFormula(orders, 'Order ID')
                                        })
                                        .all()
                                        .then((orders) => {
                                            orders.forEach((orderRecord, orderIndex) => {
                                                const { id, fields } = orderRecord;
                                                fundraiserData[fundraiserIndex]['fields']['sellerGuardians'][guardianIndex]['fields']['Sellers'][sellerIndex]['fields']['Orders'][orderIndex] = {id, fields}
                                            })
                                        })
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })
    }).then(() => {
        callback(fundraiserData)
    })
}

export const getGuardian = (id, guardianIndex, callback) => {
    
    base('SellerGuardians').find(id, function(err, record) {
        if (err) { console.error(err); return }
        const {
            id,
            fields,
        } = record;
        callback(id, guardianIndex, fields);
    })
};

export const getSeller = (props) => {
    
    const {
        id,
        callback
    } = props;
    
    base('Sellers').find(id, function(err, record) {
        if (err) { console.error(err); return }
        const {
            id,
            fields,
            fields: {
                Orders
            }
        } = record;
        callback({
            id,
            fields
        });
    })
}

export const getOrder = (props) => {

    const {
        id,
        callback
    } = props;

    base('Orders').find(id, function(err, record) {
        if (err) { console.error(err); return }
        const {
            id,
            fields
        } = record;
        callback({id, fields});
    })
}