import React from 'react';
import { createFilterFormula, getRecordType } from './getRecordsFunctions';
import {base} from '../App';
import {defaultGuardianRecord, arrayify} from './getRecordsFunctions';
import { forEach } from 'lodash';

export const getFundraisers = (user, ids, callback) => {
    // let fundraiserData = [];
    let workingData = [];
    


    const getData = (table, filterValue, filterField) => {
        return base(table).select({
            filterByFormula: createFilterFormula(filterValue, filterField)
        })
    };

    const saveDataToArray = (data, array) => {
        // const { id, fields } = ad data;
        array.push({ ...data });
    };

    function determineRole(fundraisers) {
        console.log("first")
        return fundraisers.map((fundraiser) => {
            const { id, fields } = fundraiser;
            const roleInThisFundraiser = getRecordType(id, user);
            saveDataToArray({ id, fields, role: roleInThisFundraiser }, workingData)
            return {
                id,
                fields,
                role: roleInThisFundraiser
            }
        })
    }

    function getParticipantDetails(fundraisersWithRole) {
        console.log("second: ", fundraisersWithRole)
        return fundraisersWithRole.map((fundraiser, fundraiserIndex) => {
            const { fields: { guardianIDs } } = fundraiser;
            if (guardianIDs) {
                getData('SellerGuardians', guardianIDs, 'GuardianID')
                    .all()
                    .then((guardians) => {
                        workingData[fundraiserIndex]['fields']['sellerGuardians'] = [];
                        return guardians.map((guardian) => {
                            const { id, fields } = guardian
                            saveDataToArray({ id, fields }, workingData[fundraiserIndex]['fields']['sellerGuardians'])
                        })
                    }).then(() => {
                        workingData.forEach((fundraiser, fundraiserIndex) => {
                            const { fields: { sellerGuardians }} = fundraiser;
                            if (sellerGuardians) {sellerGuardians.forEach((guardian, guardianIndex) => {
                                // console.log("guardian: ", guardian)
                                if (guardian.fields) {const { fields: { Sellers: sellers} } = guardian;
                                if (sellers) {
                                    getData('Sellers', sellers, 'recordID')
                                    .all()
                                    .then((sellers) => {
                                        workingData[fundraiserIndex]['fields']['sellerGuardians'][guardianIndex]['fields']['Sellers'] = [];
                                        return sellers.forEach((seller) => {
                                            const { id, fields } = seller;
                                            saveDataToArray({ id, fields }, workingData[fundraiserIndex]['fields']['sellerGuardians'][guardianIndex]['fields']['Sellers']);
                                        })
                                    }).then(() => {
                                        workingData.forEach((fundraiser, fundraiserIndex) => {
                                            const { fields: { sellerGuardians }} = fundraiser;
                                            sellerGuardians.forEach((guardian, guardianIndex) => {
                                                const {fields: {Sellers: sellers} } = guardian;
                                                sellers.forEach((seller, sellerIndex) => {
                                                    if (seller.fields) {const { fields: { Orders: orders }} = seller;
                                                    if (orders) {
                                                        getData('Orders', orders, 'Order ID')
                                                        .all()
                                                        .then((orders) => {
                                                            workingData[fundraiserIndex]['fields']['sellerGuardians'][guardianIndex]['fields']['Sellers'][sellerIndex]['fields']['Orders'] = [];
                                                            return orders.forEach((order) => {
                                                                const { id, fields } = order;
                                                                saveDataToArray({ id, fields }, workingData[fundraiserIndex]['fields']['sellerGuardians'][guardianIndex]['fields']['Sellers'][sellerIndex]['fields']['Orders'])
                                                            })
                                                        })
                                                    }}
                                                })
                                            })
                                        })
                                    })
                                }}
                            })}
                        })
                    })
            }  else {
                return fundraiser
            }
        })
    }

    function setAppState(fundraisers) {
        console.log("thirst")
        console.log("workingData: ", workingData)
        callback(workingData);
    }


    getData('Fundraisers', ids, 'recordID')
        .all()
        .then(determineRole)
        .then(getParticipantDetails)
        .then(setAppState)
            

    // getData('Fundraisers', ids, 'recordID').all()
    // .then((fundraisers) => {
    //     saveData(fundraisers, workingData);

    //     fundraisers.forEach((record, index) => {
    //         const { fields: {sellerGuardians} } = record;
    //         console.log("sellerGuardians: ", sellerGuardians)
    //         saveData(sellerGuardians, workingData[index]['fields'][sellerGuardians])
    //         return 
    //     })
    //     // .all()
    //     // .then((guardians) => {
    //     //     saveData(guardians, index, workingData['sellerGuardians'])
    //     //     guardians.forEach()
    //     // })
    //     // saveData(record, workingData);
    // });

    // .then((fundraisers) => {
    //     // console.log("fundraisers: ", fundraisers)
    //     fundraisers.forEach((fundraiserRecord, fundraiserIndex) => {
    //         const { 
    //             id,
    //             fields: fundraiserFields,
    //             fields: {
    //                 sellerGuardians,
    //                 deliveryDate
    //             },
    //         } = fundraiserRecord;
    //         workingData.push({
    //             role: getRecordType(id, user),
    //             id,
    //             fields: fundraiserFields,
    //         });
    //         console.log('workingData: ', workingData);
    //         if (sellerGuardians) {
    //             base('SellerGuardians').select({
    //                 filterByFormula: createFilterFormula(sellerGuardians, 'GuardianID')
    //             })
    //             .all()
    //             .then((guardians) => {
    //                 let guardianData = []
    //                 guardians.forEach((guardian, guardianIndex) => {
    //                     // fundraiserData[fundraiserIndex]['fields']['sellerGuardians'][guardianIndex] = [];
    //                     const {
    //                         id,
    //                         fields: guardianFields,
    //                         fields: {Sellers: sellers}
    //                     } = guardian;
    //                     guardianData.push({ id, fields: guardianFields})
    //                     // fundraiserData[fundraiserIndex]['fields']['sellerGuardians'][guardianIndex].push({id, fields: guardianFields});
    //                     if (sellers) {
    //                         // console.log('fundraiserData[fundraiserIndex]["fields"]["sellerGuardians"] in seller fetch: ', fundraiserData[fundraiserIndex]["fields"]["sellerGuardians"])
    //                         // fundraiserData[fundraiserIndex]['fields']['sellerGuardians'][guardianIndex]['fields']['Sellers'] = [];
    //                         let sellerData = [];
    //                         const sellerIDs = arrayify(sellers);
    //                         base('Sellers').select({
    //                             filterByFormula: createFilterFormula(sellerIDs, 'recordID')
    //                         })
    //                         .all()
    //                         .then((sellers) => {
    //                             sellers.forEach((sellerRecord, sellerIndex) => {
    //                                 const {
    //                                     id,
    //                                     fields: sellerFields,
    //                                     fields: {Orders: orders}
    //                                 } = sellerRecord;
    //                                 // fundraiserData[fundraiserIndex]['fields']['sellerGuardians'][guardianIndex]['fields']['Sellers'].push({id, fields: sellerFields})
    //                                 // sellerData.push({ id, fields: sellerFields});
    //                                 guardianData[guardianIndex]['fields']['Sellers'][sellerIndex] = {id, fields: sellerFields}
    //                                 if (orders) {
    //                                     // fundraiserData[fundraiserIndex]['fields']['sellerGuardians'][guardianIndex]['fields']['Sellers'][sellerIndex]['fields']['Orders'] = [];
    //                                     const orderIDs = arrayify(orders)
    //                                     base('Orders').select({
    //                                         filterByFormula: createFilterFormula(orderIDs, 'Order ID')
    //                                     })
    //                                     .all()
    //                                     .then((orders) => {
    //                                         orders.forEach((orderRecord, orderIndex) => {
    //                                             const { id, fields: orderFields } = orderRecord;
    //                                             guardianData[guardianIndex]['fields']['Sellers'][sellerIndex]['fields']['Orders'][orderIndex] = {id, orderFields}
    //                                             // fundraiserData[fundraiserIndex]['fields']['sellerGuardians'][guardianIndex]['fields']['Sellers'][sellerIndex]['fields']['Orders'].push({id, fields: orderFields});
    //                                         })
    //                                     })
    //                                 }
    //                             })
    //                         })
    //                     }
    //                 })
    //                 workingData[fundraiserIndex]['fields']['sellerGuardians'] = guardianData;
    //             })
                
    //         }
    //     })
    // })
    // .then(() => {
    //     // console.log("workingData: ", workingData);
    //     workingData = fundraiserData;
    //     // console.log("fundraiserData: ", fundraiserData);
    //     callback(fundraiserData)
    // })
}

