import { useAuth0 } from '@auth0/auth0-react';


const useAuth0LogIn = () => {

    const { loginWithRedirect } = useAuth0();

    const auth0LogIn = async () => {
        await loginWithRedirect({
            appState: {
              returnTo: "/profile",
            },
            authorizationParams: {
              prompt: "login",
            },
          });
    }

    return { auth0LogIn }

}

export default useAuth0LogIn