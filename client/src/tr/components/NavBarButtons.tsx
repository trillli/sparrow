import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import BtnLogIn from "./BtnLogIn";
import BtnLogOut from "./BtnLogOut";
import BtnSignUp from "./BtnSignUp";

export const NavBarButtons: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__buttons">
      {!isAuthenticated && (
        <>
          <BtnSignUp />
          <BtnLogIn />
        </>
      )}
      {isAuthenticated && (
        <>
          <BtnLogOut />
        </>
      )}
    </div>
  );
};
