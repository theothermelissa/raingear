import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';
import { RecordsContext } from '../App';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, isLoading, logout, user } = useAuth0();
    const {recordsDispatch, recordsState} = useContext(RecordsContext);

    useEffect(() => {
        if (isAuthenticated) {
            recordsDispatch({type: 'setUser', payload: user.email})
        }
    }, [isAuthenticated, user]);

    if (isLoading) {
        return <div>Loading ...</div>
    } if (!isAuthenticated) {
        return <Button onClick={() => loginWithRedirect({ appState: { targetUrl: "/profile" } })}>Login</Button>
    } if (isAuthenticated) {
        return <Button onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
    }
};

export default LoginButton; 