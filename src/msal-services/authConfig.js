import config from "../config";

export const msalConfig = {
  auth: {
    clientId: config.clientId,
    authority: "https://login.microsoftonline.com/" + config.tenantId,
    redirectUri: config.redirectUri,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequet = {
  scopes: ["User.Read"],
};

export const tokenScopes = ["User.Read"];

export const graphconfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
