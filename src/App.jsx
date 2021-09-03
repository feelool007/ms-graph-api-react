import React from "react";
import { Provider } from "react-redux";
import { MsalProvider } from "@azure/msal-react";

import store from "./store";
import msalInstance from "./msal-services";
import Page from "./components/Page";

export default () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <MsalProvider instance={msalInstance}>
          <Page />
        </MsalProvider>
      </Provider>
    </React.StrictMode>
  );
};
