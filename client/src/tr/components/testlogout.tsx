import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";






const TestLogIn: React.FC = () => {
    const { loginWithRedirect } = useAuth0();
    const fnLogIn = async () => {
        
      
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

    useEffect(() => {
        console.log('TRYING TO LOG IN')
        fnLogIn()
        return () => {
            console.log('UNMOUNTED')
        }
    }, [loginWithRedirect])
    
    return (
        <></>
    )
}

export default TestLogIn


