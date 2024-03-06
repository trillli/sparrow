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


  // const isProd = import.meta.env.PROD

  // if (isProd) {}
  // const mode = import.meta.env.MODE

  console.log('AAA')
  // console.log(redirectUri)

  const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID
  const redirectUri = import.meta.env.VITE_REACT_APP_AUTH0_CALLBACK_URL
  const audience = import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE


  console.log('b')
  console.log(redirectUri)
  // console.log(import.meta.env.MODE)
  // console.log(import.meta.env.TESTVAR)
  // console.log(import.meta.env)

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
