import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppSplash from 'src/components/AppSplash';
import AlarmsHome from 'src/components/full/pages/AlarmsHome';
import ITrillliConfig from '../types/ITrillliConfig';
import AccountPersonal from './AccountPersonal';
import { Auth0Authenticator } from './Auth0Authenticator';
import ErrorPage404 from './ErrorPage404';

interface TrillliRoutesProps {
  appConfig: ITrillliConfig
}

const TrillliRoutes: React.FC<TrillliRoutesProps> = ({ appConfig }) => {

  return (
    <Routes>
      <Route path="/" element={<AppSplash appConfig={appConfig} />} />
      <Route path="/profile" element={<Auth0Authenticator appConfig={appConfig} component={AccountPersonal} />} />
      <Route path="/callback" element={<Auth0Authenticator appConfig={appConfig} component={AlarmsHome} />} />
      <Route path="*" element={<ErrorPage404 appConfig={appConfig} />} />
    </Routes>
  );

};

export default TrillliRoutes