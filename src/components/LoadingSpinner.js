import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

const LoadingSpinner = () => {
    const [message, setMessage] = useState('  ');

    useEffect(() => {
        const loadFundraisers = () => setMessage('Loading fundraisers ...')
        const loadSellers = () => setMessage('Loading sellers ...')
        const loadOrders = () => setMessage('Loading orders ...')

        setTimeout(loadFundraisers, 2000)
        setTimeout(loadSellers, 4000)
        setTimeout(loadOrders, 6000)
    }, [])
        


    return (
        <div className="outer">
            <Spin 
                tip={message}
                style={{
                    height: '100px'
                }} 
            />
        </div>
    )
};

export default LoadingSpinner;
