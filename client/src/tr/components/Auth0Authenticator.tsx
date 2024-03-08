import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ComponentType } from "react";
import ITrillliConfig from "../types/ITrillliConfig";
import LoadingPage from "./LoadingPage";

interface Auth0AuthenticatorProps {
  component: ComponentType,
  appConfig: ITrillliConfig
}

export const Auth0Authenticator: React.FC<Auth0AuthenticatorProps> = ({appConfig, component}) => {

  // State Variables & Related ------------------------------------------------------------------ //

  // Effects & Related -------------------------------------------------------------------------- //

  // Event Handlers & Related ------------------------------------------------------------------- //

  // Other vars, util functions, etc ------------------------------------------------------------ //
  
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
        <LoadingPage appConfig={appConfig} />
    ),
  });

  return (
      <Component appConfig={appConfig} />
  )
  
};
