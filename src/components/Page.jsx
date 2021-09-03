import React, { useState, useEffect } from "react";
import { useIsAuthenticated } from "@azure/msal-react";

import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import MeetingForm from "./MeetingForm";
import { useGraph } from "../msal-services";
// import { getMe } from "../api/msGraph.api";

export default () => {
  // const [profile, setProfile] = useState("");
  const isAuthenticated = useIsAuthenticated();
  const client = useGraph();

  // const myProfile = async () => {
  //   if (!client) return;

  //   try {
  //     const response = await getMe();
  //     setProfile(response);
  //   } catch (error) {
  //     console.log(error);
  //     setProfile("");
  //   }
  // };

  // useEffect(myProfile, [client]);

  return (
    <React.Fragment>
      {isAuthenticated ? (
        <React.Fragment>
          <SignOutButton />
          <br />
          {/* <textarea
            readOnly
            value={JSON.stringify(profile, null, 2)}
            style={{ width: "800px", height: "400px" }}
          /> */}
          <MeetingForm />
        </React.Fragment>
      ) : (
        <SignInButton />
      )}
    </React.Fragment>
  );
};
