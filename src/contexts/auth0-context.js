import React, {Component, createContext, useContext} from 'react';
import createAuth0Client from '@auth0/auth0-spa-js'; 
export const Auth0Context = createContext(); 
export const useAuth0 = () => useContext(Auth0Context); 

export class Auth0Provider extends Component {
    state = {
        message: 'testing message here!'
    };
    render() {
        const {
            auth0Client,
            isLoading,
            isAuthenticated,
            user
        } = this.state;
        const {message} = this.state;
        const {children} = this.props;
        const configObject = {
            message,
            isLoading,
            isAuthenticated,
            user,
            loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        };
        return (
            <Auth0Context.Provider value={configObject}>
                {children} 
            </Auth0Context.Provider>
        );
    }
}
