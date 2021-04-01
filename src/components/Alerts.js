import  React, { useState, useEffect, useContext } from 'react';
import {RecordsContext} from '../App';
import SingleAlert from './SingleAlert';

const Alerts = () => {
    const {
        recordsDispatch,
        recordsState: {
            alert
        }
    } = useContext(RecordsContext);

    const [alertList, setAlertList] = useState([]);

    useEffect(() => {
        // console.log("New Alert!");
        setAlertList(alertList => [... alertList, alert]);
    }, [alert]);
    
    // console.log("alert: ", JSON.stringify(alert));

    return (
        <div
            className="alertContainer"
            style={{ 
                display: 'flex', 
                flexDirection: "column", 
                width: '100%', 
                alignItems: 'center', 
                }} 
            >
            {alertList.map((alert, index) => 
                <SingleAlert 
                    message={alert["message"]} 
                    type={alert["type"]} 
                    key={index} 
                />)
            }
        </div>
    )
};

export default Alerts;
