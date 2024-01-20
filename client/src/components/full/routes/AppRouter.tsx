import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AlarmsHome from 'src/components/full/pages/AlarmsHome'
import TrillliRoutes from 'trillli/components/TrillliRoutes';
import { Auth0Router } from 'trillli/components/Auth0Router';
import { Auth0Authenticator } from 'trillli/components/Auth0Authenticator'
import AppSplash from 'src/components/AppSplash';

const AppRouter = ({ config }) => {
    const app_logo_path = "./src/assets/logos/logo-sparrow.png"
    return (
        <Router>
            <Auth0Router >
                <Routes>
                    <Route path="/" element={<AppSplash />} />
                    <Route path="/alarms" element={<Auth0Authenticator component={AlarmsHome}/>} />
                    <Route path="/*" element={<TrillliRoutes config={config} />}/>
                </Routes>
            </Auth0Router>
        </Router>
        
    );
};

export default AppRouter