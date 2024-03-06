import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'


const useAuth0LogOut = () => {

  const { logout } = useAuth0();

    // const auth0LogIn = async () => {
    //     await loginWithRedirect({
    //         appState: {
    //           returnTo: "/profile",
    //         },
    //         authorizationParams: {
    //           prompt: "login",
    //         },
    //       });
    // }

    const auth0LogOut = () => {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    }

    return { auth0LogOut }

}

export default useAuth0LogOut