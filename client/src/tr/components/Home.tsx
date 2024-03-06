import React from "react";
import { Auth0Features } from "./Auth0Features";
import { HeroBanner } from "./HeroBanner";
import { PageLayout } from "./PageLayout";

export const Home: React.FC = () => (
  <PageLayout>
    <>
      <HeroBanner />
      <Auth0Features />
    </>
  </PageLayout>
);

export default Home
