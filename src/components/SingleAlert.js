import  React, { useState, useEffect } from 'react';
import { Alert } from 'antd';

const SingleAlert = ({ message, type }) => {
    const [showAlert, setShowAlert] = useState(true)
    // console.log("message: ", message)

    useEffect(() => {
        
    }, []);

    // notification.open({
    //     message: 'Notification Title',
    //     description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    // });

        
    return (
       <>
        {showAlert && <Alert showIcon style={{ width: "95%" }} message={message} closable type={type} /> }
       </>
    )
};

export default SingleAlert;
