import { base } from '../App';
import { createFilterFormula, arrayify } from './getRecordsFunctions';
import { userFields } from './CurrentFields';
import config from '../config'
import axios from 'axios';

export const getUser = (email, callback) => {

    axios.get(`${config.baseUrl}/auth/user/${email}`)
        .then(res => {

            const users = res.data;

            if (!users.length) {
                callback(null, "Sorry, you're not a user!")
            }
            const {
                fields,
                fields: {
                    allFundraisers
                }
            } = users[0];

            const usersFundraiserList = arrayify(allFundraisers);
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
        }).catch(err => {
            callback(null, "Sorry, you're not a user!")
        })


    // base('Users').select({
    //     filterByFormula: createFilterFormula([email], 'emailToLowerCase'),
    //     fields: userFields,
    // })
    //     .all()
    //     .then((users) => {

    //         console.log({ res: users })
    //         if (!users.length) {
    //             callback(null, "Sorry, you're not a user!")
    //         }
    //         const {
    //             fields,
    //             fields: {
    //                 allFundraisers
    //             }
    //         } = users[0];

    //         const usersFundraiserList = arrayify(allFundraisers);
    //         const roleInfo = usersFundraiserList.map((id) => {
    //             return ({
    //                 'role': 'pending',
    //                 'fundraiserID': id
    //             });
    //         });
    //         callback({
    //             ...fields,
    //             'roleInfo': roleInfo
    //         })
    //     });
}