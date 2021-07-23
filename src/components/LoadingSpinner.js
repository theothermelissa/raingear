import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

const LoadingSpinner = () => {
    const [message, setMessage] = useState('  ');
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        const loadFundraisers = () => setMessage('Loading fundraisers ...')
        const loadSellers = () => setMessage('Loading sellers ...')
        const loadOrders = () => setMessage('Loading orders ...')
        
        if (cancelled) return;
        setTimeout(loadFundraisers, 2000)
        setTimeout(loadSellers, 4000)
        setTimeout(loadOrders, 6000)

        return () => setCancelled(true);
    }, [cancelled])
        


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
