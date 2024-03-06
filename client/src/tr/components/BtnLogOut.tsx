import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const fnLogOut = () => {
  const { logout } = useAuth0();

  // const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  // };
}

export const BtnLogOut: React.FC = () => {
  // const { logout } = useAuth0();

  // const handleLogout = () => {
  //   logout({
  //     logoutParams: {
  //       returnTo: window.location.origin,
  //     },
  //   });
  // };

  return (
    // <button className="button__logout" onClick={handleLogout}>
      <button className="button__logout" onClick={fnLogOut}>
      Log Out
    </button>
  );
};

export default BtnLogOut
