import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppConfig from 'src/AppConfig';
import AppSplash from 'src/components/AppSplash';
import AlarmsHome from 'src/components/full/pages/AlarmsHome';
import { Auth0Authenticator } from 'src/tr/components/Auth0Authenticator';
import { Auth0Router } from 'src/tr/components/Auth0Router';
import TrillliRoutes from 'src/tr/components/TrillliRoutes';
import ITrillliConfig from 'src/tr/types/ITrillliConfig';

const AppRoutes: React.FC = () => {

    let appConfig:ITrillliConfig = new AppConfig();

    return (
        <Router>
            <Auth0Router >
                <Routes>
                    <Route path="/" element={<AppSplash appConfig={appConfig} />} />
                    <Route path="/alarms" element={<Auth0Authenticator appConfig={appConfig} component={AlarmsHome}/>} />
                    <Route path="/*" element={<TrillliRoutes appConfig={appConfig} />}/>
                </Routes>
            </Auth0Router>
        </Router>
    );
};

export default AppRoutes