import React, {useState, useEffect, useContext} from 'react';
import {RecordsContext} from '../../App';
import {uniqueId, findIndex, matchesProperty} from 'lodash';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    TreeSelect,
    Switch
} from 'antd';

const AdminView = () => {
    const [currentView, setCurrentView] = useState({
        fundraiser: '',
        role: '',
        user: ''
    });

    const {
        recordsDispatch,
        recordsState: {
            fundraiserToDisplay: {
                fundraisers
            }
        }
    } = useContext(RecordsContext);

    const setUser = (e) => {
        const {
            fundraiser,
            user,
            role
        } = e;
        const newUser = Object.assign.apply( null, e );
        setCurrentView(newUser);
    }

    useEffect(() => {
        // switch (currentView.role) {
        //     case "": 
        //         break;
        //     case "seller": 
        //         console.log("It's a seller!");
        //         break;
        //     case "guardian": 
        //         console.log("It's a guardian!");
        //         break;
        //     case "provider": 
        //         console.log("It's a provider!");
        //         break;
        //     case "organizer": 
        //         console.log("It's a organizer!");
        //         break;
        //     default:
        //         return;
        // }
        if (currentView.fundraiser) {
            const {
                role,
                fundraiser,
                user
            } = currentView
            {const fullFundraiserRecord = fundraisers[findIndex(fundraisers, matchesProperty('id', currentView.fundraiser))];
            recordsDispatch({
                type: "setFundraiserToDisplay",
                payload: {
                    role,
                    fundraisers: fullFundraiserRecord
                },
            })
        }
        }
    }, [currentView])

    const fundraisersToChooseFrom = () => {
        let result = fundraisers.map((fundraiser) => {
            const {
                id,
                fields: {
                    fundraiserName,
                    contactEmail: organizer,
                    'email (from Administrators)': administrators,
                    'Email (from sellers)': sellers,
                    'Email (from guardianIDs)': guardians,
                    'Emails (from suppliers)': providersAsString,
                }
            } = fundraiser;
            const providers = providersAsString.split(", ");

            let users = [];

            let formattedUser = (userEmail) => {
                return {
                    value: {user: userEmail},
                    label: userEmail,
                    key: uniqueId(),
                }
            }
            if (organizer) {
                users.push({
                    key: uniqueId(),
                    value: { role: 'organizer'},
                    label: 'Organizer',
                    children: [formattedUser(organizer)]
                })
            }
            if (sellers) {
                users.push({
                    key: uniqueId(),
                    value: {role: 'seller'},
                    label: 'Sellers',
                    children: sellers.map((email) => formattedUser(email))
                })
            } if (guardians) {
                users.push({
                    key: uniqueId(),
                    value: {role: 'guardian'},
                    label: 'Guardians',
                    children: guardians.map((email) => formattedUser(email))
                })
            } if (providers) {
                users.push({
                    key: uniqueId(),
                    value: {role: 'provider'},
                    label: 'Providers',
                    children: providers.map((email) => formattedUser(email))
                })
            }

                        
            return {
                'value': {"fundraiser": fundraiser.id},
                'key': uniqueId(),
                'label': fundraiser.fields.fundraiserName,
                'children': users
            }
        })
        return result;
    }


    return (
        <div style={{ marginTop: "30px" }}>
            <Form labelCol={
                    {span: 4}
                }
                wrapperCol={
                    {span: 14}
                }
                layout="horizontal"
                initialValues={
                    {size: "large"}
                }
                onValuesChange={setUser}
                size="large">
                <Form.Item label="Choose User">
                    <Cascader onChange={setUser} options={fundraisersToChooseFrom()}/>
                </Form.Item>
            </Form>
        </div>
    )
};

export default AdminView;

