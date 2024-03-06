import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AlarmsHome from 'src/components/full/pages/AlarmsHome'
import TrillliRoutes from 'src/tr/components/TrillliRoutes';
import { Auth0Router } from 'src/tr/components/Auth0Router';
import { Auth0Authenticator } from 'src/tr/components/Auth0Authenticator'
import AppSplash from 'src/components/AppSplash';
import AppConfig from 'src/AppConfig';
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