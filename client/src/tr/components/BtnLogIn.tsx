import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const fnLogIn = async () => {

  const { loginWithRedirect } = useAuth0();

  // const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  // };

}

export const BtnLogIn: React.FC = () => {
  // const { loginWithRedirect } = useAuth0();

  // const handleLogin = async () => {
  //   await loginWithRedirect({
  //     appState: {
  //       returnTo: "/profile",
  //     },
  //     authorizationParams: {
  //       prompt: "login",
  //     },
  //   });
  // };

  return (
    // <button className="button__login" onClick={handleLogin}>
    <button className="button__login" onClick={fnLogIn}>
      Log In
    </button>
  );
};

export default BtnLogIn
