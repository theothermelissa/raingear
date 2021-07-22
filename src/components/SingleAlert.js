import  React, { useState, useEffect } from 'react';
import { Alert } from 'antd';

const SingleAlert = ({ message, type }) => {
    const [showAlert, setShowAlert] = useState(true)

    useEffect(() => {
        
    }, []);

    return (
       <>
        {showAlert && <Alert showIcon style={{ width: "95%" }} message={message} closable type={type} /> }
       </>
    )
};

export default SingleAlert;
