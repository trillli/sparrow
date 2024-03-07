import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Callback from './Callback'
import ErrorPage404 from './ErrorPage404'
import Profile from './AccountPersonal'
import Admin from './Admin';
import Protected from './Protected';
import Public from './Public';
import { Auth0Authenticator } from './Auth0Authenticator';
import ITrillliConfig from '../types/ITrillliConfig';
import testlogout from './testlogout'
import TestLogIn from './testlogout';
import AccountPersonal from './AccountPersonal';
import LandingPage from './LandingPage'
import LoadingPage from './LoadingPage';
import AppSplash from 'src/components/AppSplash';
import AlarmsHome from 'src/components/full/pages/AlarmsHome';

interface TrillliRoutesProps {
  appConfig: ITrillliConfig
}

const TrillliRoutes: React.FC<TrillliRoutesProps> = ({appConfig}) => {

  return (
      <Routes>
          {/* <Route path="/" element={<LandingPage appConfig={appConfig} />} /> */}
          <Route path="/" element={<AppSplash appConfig={appConfig} />} />
          <Route path="/profile" element={<Auth0Authenticator appConfig={appConfig} component={AccountPersonal} />} />
          {/* <Route path="/callback" element={<LoadingPage appConfig={appConfig} />} /> */}
          {/* <Route path="/callback" element={<LandingPage appConfig={appConfig} />} /> */}
          {/* <Route path="/callback" element={<AppSplash appConfig={appConfig} />} /> */}
          <Route path="/callback" element={<Auth0Authenticator appConfig={appConfig} component={AlarmsHome} />} />
          <Route path="*" element={<ErrorPage404 appConfig={appConfig} />} />
      </Routes>
  );

};

export default TrillliRoutes