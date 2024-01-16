import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AlarmsHome from 'src/components/full/pages/AlarmsHome'
import TrillliRoutes from 'trillli_client/src/components/full/routes/TrillliRoutes'
import { Auth0Router } from 'trillli_client/src/components/Auth0Router';
import { Auth0Authenticator } from 'trillli_client/src/components/Auth0Authenticator'

const AppRouter = ({ config }) => {
    const app_logo_path = "./src/assets/logos/logo-sparrow.png"
    return (
        <Router>
            <Auth0Router >
                <Routes>
                    <Route path="/*" element={<TrillliRoutes config={config} />}/>
                    <Route path="/alarms" element={<Auth0Authenticator component={AlarmsHome}/>} />
                    {/* <Route path="/alarms" element={<AlarmsHome />} /> */}
                </Routes>
            </Auth0Router>
        </Router>
        
    );
};

export default AppRouter