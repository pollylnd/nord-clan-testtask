import feathers from "@feathersjs/client";

import axios from "axios";

export const apiUrl = `${process.env["REACT_APP_API_HOST"]}:${process.env["REACT_APP_API_PORT"]}`;

const app = feathers();

// Connect to a different URL
const restClient = feathers.rest(apiUrl);

// Configure an AJAX library (see below) with that client
//app.configure(restClient.fetch(window.fetch))

app.configure(restClient.axios(axios));

// https://docs.feathersjs.com/api/authentication/client.html

const authOptions = {
  header: "Authorization", // the default authorization header for REST
  path: "/authentication", // the server-side authentication service path
  jwtStrategy: "jwt", // the name of the JWT authentication strategy
  entity: "user", // the entity you are authenticating (ie. a users)
  service: "user", // the service to look up the entity
  cookie: "feathers-jwt", // the name of the cookie to parse the JWT from when cookies are enabled server side
  storageKey: "feathers-jwt", // the key to store the accessToken in localstorage or AsyncStorage on React Native
  storage: window.localStorage["feathers-jwt"]
    ? window.localStorage
    : window.sessionStorage, // Passing a WebStorage-compatible object to enable automatic storage on the client.
};

app.configure(feathers.authentication(authOptions));

export const changeStorageType = (keepSigned) => {
  return keepSigned
    ? (app.settings.storage = window.localStorage)
    : (app.settings.storage = window.sessionStorage);
};
export default app;
