import React, { useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';
import { RecordsContext } from '../App';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, isLoading, logout, user } = useAuth0();
    const {recordsDispatch} = useContext(RecordsContext);

    useEffect(() => {
        if (isAuthenticated) {
            recordsDispatch({type: 'setUser', payload: user})
        } else {
            recordsDispatch({type: 'removeUser'})
        }
    }, [isAuthenticated, recordsDispatch, user]);

    const logOutUser = () => {
        recordsDispatch({type: 'removeUser'})
        logout({ returnTo: window.location.origin })
    }

    if (isLoading) {
        return <div>Loading ...</div>
    } if (!isAuthenticated) {
        return <Button onClick={() => loginWithRedirect({ login_hint: 'caseymcneil@gmail.com', screen_hint: 'signup', appState: { targetUrl: "/" } })}>Login</Button>
    } if (isAuthenticated) {
        return <Button onClick={logOutUser}>Logout</Button>
    }
};

export default LoginButton; 