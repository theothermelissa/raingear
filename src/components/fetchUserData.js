import {base} from '../App';
import { createFilterFormula, arrayify } from './getRecordsFunctions';

export const getUser = (email, callback) => {
    base('Users').select({
        filterByFormula: createFilterFormula([email], 'Email')
    })
    .all()
    .then((users) => {
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
    });
}