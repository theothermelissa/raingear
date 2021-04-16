import React from 'react';
import { useAuth0 } from '../contexts/auth0-context';
import { Button } from 'antd';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    console.log("loginWithRedirect: ", loginWithRedirect);

    return (
        <Button onClick={() => loginWithRedirect()}>Login</Button>
    )
};

export default LoginButton; 