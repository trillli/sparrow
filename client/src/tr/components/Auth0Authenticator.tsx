import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ComponentType } from "react";
import LoadingPage from "./LoadingPage";
import ITrillliConfig from "../types/ITrillliConfig";
import TrillliPageBuilder from "./TrillliPageBuilder";

interface Auth0AuthenticatorProps {
  component: ComponentType,
  appConfig: ITrillliConfig
}

export const Auth0Authenticator: React.FC<Auth0AuthenticatorProps> = ({appConfig, component}) => {
  
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
        <LoadingPage appConfig={appConfig} />
    ),
  });

  return (
      <Component appConfig={appConfig} />
  )
  
};
