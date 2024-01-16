import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// const BtnLogIn = () => {
//     const { loginWithRedirect } = useAuth0();
//     return (
//         <button onClick={() => loginWithRedirect()}>Log In</button>
//     )
// };


// import { useAuth0 } from "@auth0/auth0-react";
// import React from "react";

export const BtnLogIn: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <button className="button__login" onClick={handleLogin}>
      Log In
    </button>
  );
};

export default BtnLogIn
