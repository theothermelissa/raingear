import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const Profile = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>
    }

    return(isAuthenticated && (
        <div>
            <img src={
                    user.picture
                }
                alt={
                    user.name
                }/>
            <h2>{
                user.name
            }</h2>
            <p>{
                user.email
            }</p>
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>
        </div>
    ));
};

export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <div>Loading ...</div>,
  });
