import React from 'react';
import {Button} from 'antd';

const InviteSellersButton = ({ link }) => {

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '30px'
        }}>
            <Button type='primary' href={`mailto:?&subject=Please%20Join%20Our%20Fundraiser&body=Hello! Please join our fundraiser by following this link: ${link}.`}>Invite Sellers</Button>
        </div>
    )
};

export default InviteSellersButton;