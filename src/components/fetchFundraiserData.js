import React from 'react';
import { createFilterFormula, getRecordType } from './getRecordsFunctions';
import {base} from '../App';
import {defaultGuardianRecord, arrayify} from './getRecordsFunctions';
import { compact, create, filter, uniq } from 'lodash';

export const getFundraisers = async (user, ids, callback) => {

    // if fundraiser role exists, get guardian records for each fundraiser
    // if guardian records exist, get seller records
    // if seller records exist, etc., and on to orders
    // return completed fundraiser object
    
    
    const fundraiserIDsToGet = arrayify(ids);
    const fundraiserRecords = await createFundraiserList(fundraiserIDsToGet);
    const fundraisersWithGuardianIDs = getGuardianIDs(fundraiserRecords);
    const fundraisersWithGuardianData = await getGuardianData(fundraisersWithGuardianIDs);
    const fundraisersWithSellerData = await getSellerData(fundraisersWithGuardianData)
    const fundraisersWithOrderData = await getOrderData(fundraisersWithSellerData)

    await callback(fundraisersWithOrderData)
    

    // const fundraisers = async () => {
    //     createFundraiserList(fundraiserIDsToGet)
    //     .then(getGuardianIDs)
    // };
    
    function getData(table, filterValue, filterField) {
        return base(table).select({
            filterByFormula: createFilterFormula(filterValue, filterField)
        })
    };

    async function createFundraiserList(ids) {
        let fundraisers = [];
        for (let i = 0; i < ids.length; i++) {
            let fundraiserData = await getData('Fundraisers', ids[i], 'recordID').all();
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
            const allGuardians = [...guardianIDs, defaultGuardianRecord]
            const guardiansToGet = uniq(allGuardians);
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
                            let sellerData = await getData('Sellers', sellerIDs[k], 'recordID').all();
                            if (sellerData.length) {
                                sellers.push({
                                    id: sellerData[0]['id'],
                                    fields: sellerData[0]['fields']
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
                                    let orderData = await getData('Orders', orderIDs[l], 'Order ID').all();
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
            console.log("guardians: ", guardians);
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
                    let guardianData = await getData('SellerGuardians', guardianID, 'GuardianID').all()
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

    // async function getSellerData(fundraiserList) {
    //     return fundraiserList.map()
    // }
    
    

    

//     function getFundraiserDetailsByID(id) {
//         return getData('Fundraisers', id, 'recordID')
//             .all()
//             .then(determineRole)
//             .then(getGuardianRecords)
//             .then(getSellerRecords)
//             .then(getOrderRecords)
//             // .then(logStuff)

//     }

//     function determineRole(fundraiser) {
//         if (!fundraiser.length) {
//             console.log("fundraiser: ", fundraiser)
//             return;
//         }
//         const { id, fields } = fundraiser[0];
//         const roleInThisFundraiser = getRecordType(id, user);
//         return {
//             id,
//             fields,
//             role: roleInThisFundraiser
//         }
//     }

//     function getGuardianFields(guardians) {
//         guardians.map(({id, fields}) => {
//             console.log("id and fields of guardian: ", id, fields)
            
//             return {
//                 id,
//                 fields
//             }
//         })
//     }

//     async function fetchGuardianRecords(guardianIDs) {
//         if (guardianIDs) {
//             const guardians = await getData('SellerGuardians', guardianIDs, 'GuardianID')
//                 .all();
//             return Promise.all(getGuardianFields(guardians));
//         }
//     }

//     async function getGuardianRecords(fundraiserWithRole) {
//         console.log("fundraiserWithRole: ", fundraiserWithRole)
//         if (fundraiserWithRole) {
//             const { id, role, fields, fields: { guardianIDs} } = fundraiserWithRole;

//             return {
//                 id,
//                 role, 
//                 fields: {
//                     ...fields,
//                     sellerGuardians: await fetchGuardianRecords(guardianIDs)
//                 }
                
//             }
//         }
//     }

//     function logStuff(stuff) {
//         console.log('stuff here: ', stuff)
//         return stuff;
//     }

//     function getSellerDetails(sellerIDs) {
//         return getData('Sellers', sellerIDs, 'recordID').all()
//     }

//     async function addSellerDetailsToGuardian (guardian) {
//         const { 
//             id,
//             role,
//             fields,
//             fields: {
//                 sellerIDs
//             }
//         } = guardian;
        
//         if (sellerIDs) {
//             const resolvedSellerDetails = await getSellerDetails(sellerIDs)
//             // console.log("getSellerDetails(sellerIDs): ", getSellerDetails(sellerIDs));
//             return {
//                 id,
//                 role,
//                 fields: {
//                     ...fields,
//                     Sellers: resolvedSellerDetails
//                 }
//             }
//         } else {
//             return guardian
//         }
//     }


//     async function getSellerRecords(fundraiserWithGuardians) {
//         console.log("fundraiserWithGuardians: ", fundraiserWithGuardians)
//         if(fundraiserWithGuardians) {
//             const { 
//                 id,
//                 role,
//                 fields,
//                 fields: {
//                     sellerGuardians
//                 }
//             } = fundraiserWithGuardians;
//             console.log('fundraiserWithGuardians: ', fundraiserWithGuardians)

//             const resolvedGuardians = await sellerGuardians;
            
//             return {
//                 id,
//                 role,
//                 fields: {
//                     ...fields,
//                     sellerGuardians: resolvedGuardians.map((guardian) => {
//                         return addSellerDetailsToGuardian(guardian);
//                     })
//                 }
//             }
//         }
//     }

//     function getOrderDetails(orderIDs) {
//         return getData('Orders', orderIDs, 'Order ID').all()
//     }

//     async function addOrdersToSellers(sellers) {
//         const resolvedSellers = await sellers;
//         if (resolvedSellers) {
//             return resolvedSellers.map((seller) => {
//                 const {
//                     id,
//                     fields,
//                     fields: {
//                         orderIDs
//                     }
//                 } = seller;

//                 return {
//                     id,
//                     fields: {
//                         ...fields,
//                         Orders: getOrderDetails(orderIDs)
//                     }
//                 }
//             })
//         }
//     }

//     async function addOrdersToGuardian(guardian) {
//         let resolvedGuardian = await guardian
//         if (resolvedGuardian) {
//             const {
//                 id,
//                 fields,
//                 fields: {
//                     Sellers
//                 }
//             } = resolvedGuardian;

//             return {
//                 id,
//                 fields: {
//                     ...fields,
//                     Sellers: addOrdersToSellers(Sellers)
//                 }
//             }
//         }
//     }

        

//     async function getOrderRecords (fundraiserWithSellers) {
//         if (fundraiserWithSellers) {
//             const {
//                 id, role, fields,
//                 fields: {
//                     sellerGuardians
//                 }
//             } = fundraiserWithSellers;

//             const resolvedGuardians = await sellerGuardians;

//             return new Promise((resolve, reject) => {
//                 resolve({
//                     id,
//                     role,
//                     fields: {
//                         ...fields,
//                         sellerGuardians: resolvedGuardians.map((guardian) => {
//                             return addOrdersToGuardian(guardian)
//                         })
//                     }
//                 })
//             })
//         }
//     }



//     let allFundraiserData = fundraiserIDsToGet.map(id => {
//         try {
//             return getFundraiserDetailsByID(id)
//         } catch(err) {
//             console.error(err);
//         }
//     });

    
//     function compactFundraisers(promises) {
//         Promise.all(promises).then((results) => {
//             callback(compact(results))
//         })
//         // let resolved = await Promise.allSettled(promises);
//     };

//     compactFundraisers(allFundraiserData);
}

