import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>
    } if (!isAuthenticated) {
        return <Button onClick={() => loginWithRedirect({ appState: { targetUrl: "/profile" } })}>Login</Button>
    } if (isAuthenticated) {
        return <Button onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
    }
};

export default LoginButton; 