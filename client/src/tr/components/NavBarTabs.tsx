import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarTab } from "./NavBarTab";

export const NavBarTabs: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__tabs">
      <NavBarTab path="/profile" label="Profile" />
      <NavBarTab path="/public" label="Public" />
      <NavBarTab path="/alarms" label="Alarms2" />
      {isAuthenticated && (
        <>
          <NavBarTab path="/protected" label="Protected" />
          <NavBarTab path="/admin" label="Admin" />
          <NavBarTab path="/alarms" label="Alarms" />
        </>
      )}
    </div>
  );
};
