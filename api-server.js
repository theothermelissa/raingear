const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = requre('helmet');
const authConfig = require('./src/auth_config.json')
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();

// process.env.REACT_APP_AIRTABLE_API_KEY

const apiPort = process.env.REACT_APP_AUTH0_API_PORT || 3001;
const appPort = process.env.REACT_APP_AUTH0_SERVER_PORT || 3000;
const appOrigin = process.env.REACT_APP_AUTH0_APP_ORIGIN || `https://localhost:${appPort}`;
const domain = process.env.REACT_APP_AUTH0_DOMAIN || `https://localhost:${appPort}`;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE || `https://localhost:${appPort}`;

if (!domain || !audience) {
    throw new Error(
        'Please make sure that auth_config.json is in place and populated'
    );
}

const authorizaeAccessToken = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`
    }),
    audience: audience,
    issuer: `https://${domain}/`,
    algorithms: ["RS256"]
});

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

app.get("/api/public", (req, res) => {
    res.send({
        msg: "You called the public endpoint!"
    });
});

app.get("/api/protected", authorizaeAccessToken, (req, res) => {
    res.send({
        msg: "You called the protected endpoint!"
    });
});

app.listen(port, () => console.log(`API Server listening on port ${apiPort}`));