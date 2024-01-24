import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AlarmsHome from 'src/components/full/pages/AlarmsHome'
import TrillliRoutes from 'trillli/src/components/TrillliRoutes';
import { Auth0Router } from 'trillli/src/components/Auth0Router';
import { Auth0Authenticator } from 'trillli/src/components/Auth0Authenticator'
import AppSplash from 'src/components/AppSplash';
import AppConfig from 'src/AppConfig';
import TrillliConfig from 'trillli/src/types/TrillliConfig';

interface AppRoutesProps {
    app_config: TrillliConfig
}

const AppRoutes: React.FC<AppRoutesProps> = ({app_config}) => {

    return (
        <Router>
            <Auth0Router >
                <Routes>
                    <Route path="/" element={<AppSplash app_config={app_config} />} />
                    <Route path="/alarms" element={<Auth0Authenticator app_config={app_config} component={AlarmsHome}/>} />
                    <Route path="/*" element={<TrillliRoutes app_config={app_config} />}/>
                </Routes>
            </Auth0Router>
        </Router>
    );
};

export default AppRoutes