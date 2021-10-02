import React, {useState} from 'react';
import {Button} from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const InviteSellersButton = ({ link }) => {

    const [copied, setCopied] = useState(false);

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '30px'
        }}>
            <CopyToClipboard text={link}>
                <Button onClick={() => setCopied(true)} type={copied ? "ghost" : "primary"}>{copied ? "Copied to Clipboard" : "Copy Seller Invite Link"}</Button>
            </CopyToClipboard>
        </div>
    )
};

export default InviteSellersButton;