import { Auth0Provider, AppState } from "@auth0/auth0-react";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

interface Auth0RouterProps {
  children: React.ReactNode;
}

export const Auth0Router = ({
  children,
}: PropsWithChildren<Auth0RouterProps>): JSX.Element | null => {
  const navigate = useNavigate();

  const domain = 'dev-m0zbh7x7q4v4tlo6.us.auth0.com'
  const clientId = 'vYABLvf58qGhCj2kARAv3HnFsJ4vpeep'
  const redirectUri = 'http://localhost:4040/callback'
  const audience = 'https://sparrow.trillli.com'

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
