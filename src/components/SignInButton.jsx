import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from "@material-ui/core";

import { loginRequet } from "../msal-services/authConfig";
import msalInstance, { createGraphClient } from "../msal-services";

export default () => {
  const { instance } = useMsal();

  const login = async () => {
    try {
      const response = await instance.loginPopup(loginRequet);
      createGraphClient(msalInstance, response.account);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button color="primary" variant="contained" size="medium" onClick={login}>
      Login to Azure
    </Button>
  );
};
