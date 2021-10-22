import React, {useState, useEffect, useContext} from 'react';
import {RecordsContext} from '../App';
import {uniqueId} from 'lodash';
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
        recordsState: {
            fundraiserToDisplay: {
                fundraisers
            }
        }
    } = useContext(RecordsContext);

    const doAThing = (e) => {
        const {
            fundraiser,
            user,
            role
        } = e;
        
        const newUser = Object.assign.apply( null, e );
        setCurrentView(newUser);
    }

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
                    'Email (from Users)': providers,
                }
            } = fundraiser;

            let users = [];

            let formattedUser = (userEmail) => {
                return {
                    value: {user: userEmail},
                    label: userEmail,
                    key: uniqueId(JSON.stringify(userEmail)),
                }
            }

            if (administrators) {
                users.push({
                    key: uniqueId(JSON.stringify('administrators')),
                    value: {role: 'administrator'},
                    label: 'Administrators',
                    children: administrators.map((email) => formattedUser(email)),
                })
            } if (sellers) {
                users.push({
                    key: uniqueId(JSON.stringify('sellers')),
                    value: {role: 'seller'},
                    label: 'Sellers',
                    children: sellers.map((email) => formattedUser(email))
                })
            } if (guardians) {
                users.push({
                    key: uniqueId(JSON.stringify('guardians')),
                    value: {role: 'guardian'},
                    label: 'Guardians',
                    children: guardians.map((email) => formattedUser(email))
                })
            } if (providers) {
                users.push({
                    key: uniqueId(JSON.stringify('providers')),
                    value: {role: 'provider'},
                    label: 'Providers',
                    children: providers.map((email) => formattedUser(email))
                })
            }

                        
            return {
                'value': {"fundraiser": fundraiser.id},
                'key': uniqueId((fundraiser.id)),
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
                onValuesChange={doAThing}
                size="large">
                <Form.Item label="Choose User">
                    <Cascader onChange={doAThing} options={fundraisersToChooseFrom()}/>
                </Form.Item>
            </Form>
        </div>
    )
};

export default AdminView;

