import React from "react";
import { NavBar } from "./NavBar"
import { MobileNavBar } from "./MobileNavBar"
import { PageFooter } from "./PageFooter"
import TrillliHeader from "./TrillliHeader";
import TrillliFooter from "./TrillliFooter";

interface Props {
  children: JSX.Element;
}

export const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="page-layout">
      {/* <NavBar />
      <MobileNavBar /> */}
      <TrillliHeader />
      <div className="page-layout__content">{children}</div>
      <PageFooter />
    </div>
  );
};
