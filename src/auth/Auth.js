// import auth0 from '@auth0/auth0-react';

// export default class Auth {
//     constructor(history){
//         this.history = history;
//         this.auth0 = new auth0.WebAuth({
//             domain: process.env.REACT_APP_AUTH0_DOMAIN,
//             clientID: process.env.REACT_APP_AUTH0_CLIENTID,
//             redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
//             responseType: "token id_token",
//             scope: "openid profile email"
//         })
//     }

//     handleAuth = () => {
//         this.auth0.parseHash((err, authResult) => {
//             if (authResult && authResult.accessToken && authResult.idToken) {
//                 this.setSession(authResult);
//                 this.history.push('/');
//             } else if (err) {
//                 alert(`Error: ${err.error}`);
//                 console.log("Error: ", err.error);
//             }
//         })
//     }

//     login = () => {
//         this.auth0.authorize()
//     }
// };
