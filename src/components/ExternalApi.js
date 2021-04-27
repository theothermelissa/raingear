import React, { useState } from 'react';
import { Button, Alert } from 'antd';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const apiOrigin = process.env.REACT_APP_AUTH0_APP_ORIGIN

const ExternalApi = () => {
    const [state, setState] = useState({
        showResult: false,
        endpointMessage: '',
        error: null    
    });

    const { 
        loginWithPopup,
        getAccessTokenWithPopup,
        getAccessTokenSilently
    } = useAuth0();

    const handleConsent = async () => {
        try {
            await getAccessTokenWithPopup();
            setState({
                ...state,
                error: null
            });
        } catch (error) {
            setState({
                ...state,
                error: error.error
            });
        }
    };

    const handleLoginAgain = async () => {
        try {
            await loginWithPopup();
            setState({
                ...state,
                error: null
            });
        } catch (error) {
            setState({
                ...state,
                error: error.error
            });
        }
        await callPublicEndpoint();
    };

    const callProtectedEndpoint = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${apiOrigin}/api/protected`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = await response.json();
            setState({
                ...state,
                showResult: true,
                endpointMessage: responseData
            });
        } catch (error) {
            setState({
                ...state,
                error: error.error
            });
        }
    };

    const callPublicEndpoint = async () => {
        try {
            const response = await fetch(`${apiOrigin}/api/public`);
            const responseData = await response.json();
            console.log("responseData: ", responseData)
            setState({
                ...state,
                showResult: true,
                endpointMessage: responseData
            });
        } catch (error) {
            setState({
                ...state,
                error: error.error
            });
        }
    };

    const handle = (e, fn) => {
        e.preventDefault();
        fn();
    };

    return (
        <>
            <div className="mb-5">
                {state.error === "consent_required" && (
                    <Alert>You need to{" "}
                        <a
                            href="#/"
                            className="alert-link"
                            onClick={(e) => handle(e, handleConsent)}
                        >
                            consent to get access to users api
                        </a>
                    </Alert>
                )}

                {state.error === "login_required" && (
                    <Alert>
                        You need to{" "}
                            <a
                                href="#/"
                                className="alert-link"
                                onClick={(e) => handle((e, handleLoginAgain))}
                            >
                                login again
                            </a>
                    </Alert>
                )}

                <h1>External API</h1>
                <p>
                    Ping an external API by clicking one of the buttons below. The private APIs will call the external API using an access token, and the API will validate it using the API's audience value.
                </p>
                <div>
                    <Button onClick={callPublicEndpoint}>Ping Public Endpoint</Button>
                </div>
                <div>
                    <Button onClick={callProtectedEndpoint}>Ping Protected Endpoint</Button>
                </div>
            </div>
            <div>
                {state.showResult && (
                    <div data-testid="api-result">
                        <h6 className="muted">Result</h6>
                        {state.endpointMessage.msg}
                    </div>
                )}
            </div>
        </>
    );
};

export default ExternalApi;