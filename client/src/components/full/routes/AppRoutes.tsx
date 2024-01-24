import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AlarmsHome from 'src/components/full/pages/AlarmsHome'
import TrillliRoutes from 'trillli/src/components/TrillliRoutes';
import { Auth0Router } from 'trillli/src/components/Auth0Router';
import { Auth0Authenticator } from 'trillli/src/components/Auth0Authenticator'
import AppSplash from 'src/components/AppSplash';
import AppConfig from 'src/AppConfig';

const AppRoutes: React.FC = () => {

    let appConfig = new AppConfig();

    return (
        <Router>
            <Auth0Router >
                <Routes>
                    <Route path="/" element={<AppSplash />} />
                    <Route path="/alarms" element={<Auth0Authenticator component={AlarmsHome}/>} />
                    <Route path="/*" element={<TrillliRoutes appConfig={appConfig} />}/>
                </Routes>
            </Auth0Router>
        </Router>
    );
};

export default AppRoutes