import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

    const history = useHistory();

    // console.log("window.location.origin: ", JSON.stringify(window.location.origin));

//     const onRedirectCallback = appState => {
//   history.push(
//     appState && appState.targetUrl
//       ? appState.targetUrl
//       : window.location.href = "https://www.exampleroute.com/pointofredirect"
//   );
// };
    
    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    }
    
    // console.log("History: ", JSON.stringify(history));

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            // redirectUri={window.location.origin}
            redirectUri={"https://localhost:3000/profile"}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;
