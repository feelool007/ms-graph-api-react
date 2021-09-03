import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import { client, createGraphClient } from "./authProvider";
import { useGraph } from "./useGraph";

const msalInstance = new PublicClientApplication(msalConfig);

if (msalInstance.getAllAccounts().length > 0) {
  createGraphClient(msalInstance, msalInstance.getAllAccounts()[0]);
}

export default msalInstance;
export { client, createGraphClient, useGraph };
