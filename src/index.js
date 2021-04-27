import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

let state = {};
const updateState = (changes) => {
  state = Object.assign({}, state, changes);
}

let initialState = {
  name: "Melissa"
};
updateState(initialState);
// console.log("updatedState: ", state);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
        >
        <App state={state} />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
