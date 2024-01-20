import React from 'react'
import { createRoot } from 'react-dom/client'
// import { Auth0Provider } from '@auth0/auth0-react'
// import { Auth0ProviderNavigator } from 'trillli/components/Auth0ProviderNavigator.tsx'
import App from './App.tsx'
// import 'trillli_client/styles/stylesss.css'


const root = createRoot(document.getElementById('root'));
root.render(
  // <Auth0ProviderNavigator >
    <App />
  // </Auth0ProviderNavigator>
)
