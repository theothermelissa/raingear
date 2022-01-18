import { createFilterFormula, getRecordType } from './getRecordsFunctions';
import {base} from '../App';
import {defaultGuardianRecord, arrayify} from './getRecordsFunctions';
import { uniq } from 'lodash';
import { fundraiserFields, guardianFields, sellerFields, orderFields } from './CurrentFields';

export const getFundraisers = async (user, ids, callback) => {

    // get data from a table in Airtable, filtered using a programatically created formula
    function getData(table, filterValue, filterField, fieldsToGet) {
        return base(table).select({
            filterByFormula: createFilterFormula(filterValue, filterField),
            fields: fieldsToGet,
        })
    };
    
    const fundraiserIDsToGet = arrayify(ids);
    const fundraiserRecords = await createFundraiserList(fundraiserIDsToGet);
    const fundraisersWithGuardianIDs = getGuardianIDs(fundraiserRecords);
    const fundraisersWithGuardianData = await getGuardianData(fundraisersWithGuardianIDs);
    const fundraisersWithSellerData = await getSellerData(fundraisersWithGuardianData);
    const fundraisersWithOrderData = await getOrderData(fundraisersWithSellerData);

    //where the magic happens, i.e. how the completed fundraiser data is delivered to the RecordsContext
    await callback(fundraisersWithOrderData);

    async function createFundraiserList(ids) {
        let fundraisers = [];
        for (let i = 0; i < ids.length; i++) {
            let fundraiserData = await getData('Fundraisers', ids[i], 'recordID', fundraiserFields).all();
            if (fundraiserData.length) {
                fundraisers.push({
                    fields: fundraiserData[0].fields,
                    id: fundraiserData[0].id,
                    role: getRecordType(fundraiserData[0].id, user),
                })
            }
        }
        return fundraisers;
    };

    function getGuardianIDs(fundraiserList) {
        return fundraiserList.map((fundraiser) => {
            const {
                id,
                role,
                fields,
                fields: {
                    guardianIDs
                }} = fundraiser;
            const allGuardians = [[...arrayify(guardianIDs)], defaultGuardianRecord]
            const guardiansToGet = uniq(...allGuardians);
            return {
                role,
                id,
                fields: {
                    ...fields,
                    sellerGuardians: guardiansToGet
                }
            };
        })
    }

    async function getSellerData(fundraiserList) {
        let fundraisersWithSellers = [];
        for (let i = 0; i < fundraiserList.length; i++) {
            const fundraiser = fundraiserList[i];
            const {
                id,
                role,
                fields,
                fields: {
                    sellerGuardians
                }
            } = fundraiser;
            let guardians = [];
            if (sellerGuardians) {
                for (let j = 0; j < sellerGuardians.length; j++) {
                    let sellers = [];
                    const guardian = sellerGuardians[j];
                    const { 
                        id: guardianID,
                        fields: guardianFields,
                        fields: {
                            sellerIDs
                        }
                    } = guardian;
                    if (sellerIDs) {
                        for (let k = 0; k < arrayify(sellerIDs).length; k++) {
                            let sellerData = await getData('Sellers', sellerIDs[k], 'recordID', sellerFields).all();
                            const { fields, fields: { Fundraiser } } = sellerData[0];
                            if (sellerData.length && Fundraiser && id === Fundraiser[0]) {
                                sellers.push({
                                    id: sellerData[0]['id'],
                                    fields: fields,
                                })
                            }
                        };
                    };
                    guardians.push({
                        id: guardianID,
                        fields: {
                            ...guardianFields,
                            Sellers: sellers
                        }
                    })
                }
            }
            fundraisersWithSellers.push({
                id,
                role,
                fields: {
                    ...fields,
                    sellerGuardians: guardians
                }
            })
        }
        return fundraisersWithSellers;
    };

    
    async function getOrderData(fundraiserList) {
        let fundraisersWithOrders = [];
        for (let i = 0; i < fundraiserList.length; i++) {
            const fundraiser = fundraiserList[i];
            const {
                id,
                role,
                fields,
                fields: {
                    sellerGuardians
                }
            } = fundraiser;
            let guardians = [];
            if (sellerGuardians) {
                for (let j = 0; j < sellerGuardians.length; j++) {
                    let sellers = [];
                    const guardian = sellerGuardians[j];
                    const {
                        id: guardianID,
                        fields: guardianFields,
                        fields: {
                            Sellers
                        }
                    } = guardian;
                    if (Sellers) {
                        for (let k = 0; k < Sellers.length; k++) {
                            let orders = [];
                            const seller = Sellers[k];
                            const {
                                id: sellerID,
                                fields: sellerFields,
                                fields: {
                                    orderIDs
                                }
                            } = seller;
                            if (orderIDs) {
                                for (let l = 0; l < arrayify(orderIDs).length; l++) {
                                    let orderData = await getData('Orders', orderIDs[l], 'Order ID', orderFields).all();
                                    if (orderData.length) {
                                        orders.push({
                                            id: orderData[0]['id'],
                                            fields: orderData[0]['fields']
                                        })
                                    }
                                }
                            }
                            sellers.push({
                                id: sellerID,
                                fields: {
                                    ...sellerFields,
                                    Orders: orders
                                }
                            })
                        }
                    }
                    guardians.push({
                        id: guardianID,
                        fields: {
                            ...guardianFields,
                            Sellers: sellers
                        }
                    })
                }
            }
            fundraisersWithOrders.push({
                id: id,
                role: role,
                fields: {
                    ...fields,
                    sellerGuardians: guardians
                }
            })
        }
        return fundraisersWithOrders;
    };

    async function getGuardianData(fundraiserList) {
        
        let fundraisersWithGuardians = [];
        
        for (let i = 0; i < fundraiserList.length; i++) {
            const fundraiser = fundraiserList[i];        
            const {
                id,
                role,
                fields,
                fields: {
                    sellerGuardians
                }
            } = fundraiser;
            let guardians = [];
            
            if (sellerGuardians) {
                for (let j = 0; j < sellerGuardians.length; j++) {
                    const guardianID = sellerGuardians[j];
                    let guardianData = await getData('SellerGuardians', guardianID, 'GuardianID', guardianFields).all()
                    if (guardianData.length) {
                        guardians.push({
                            id: guardianData[0]['id'],
                            fields: guardianData[0]['fields']
                        })
                    }
                };
            };
            fundraisersWithGuardians.push({
                id,
                role,
                fields: {
                    ...fields,
                    sellerGuardians: guardians
                }
            });
        }
        return fundraisersWithGuardians;
    };
}

