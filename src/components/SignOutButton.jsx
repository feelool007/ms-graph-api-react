import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from "@material-ui/core";

export default () => {
  const { instance } = useMsal();

  const logout = () => {
    instance.logoutPopup();
  };

  return (
    <Button variant="contained" color="secondary" onClick={logout}>
      Logout
    </Button>
  );
};
