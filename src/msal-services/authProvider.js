import { Client } from "@microsoft/microsoft-graph-client";
import { tokenScopes } from "./authConfig";

class ImplicitMSALAuthenticationProvider {
  constructor(msalInstance, account) {
    this.instance = msalInstance;
    this.account = account;
  }

  async getAccessToken() {
    const tokenRequest = {
      scopes: tokenScopes,
      account: this.account,
    };
    try {
      const response = await this.instance.acquireTokenSilent(tokenRequest);
      return response.accessToken;
    } catch (error) {
      throw error;
    }
  }
}

let client;

const createGraphClient = (msalInstance, account) => {
  client = Client.initWithMiddleware({
    authProvider: new ImplicitMSALAuthenticationProvider(msalInstance, account),
  });
};

export { client, createGraphClient, ImplicitMSALAuthenticationProvider };
