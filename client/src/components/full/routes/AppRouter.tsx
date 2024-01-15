import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AlarmsHome from 'src/components/full/pages/AlarmsHome'
import TrillliRoutes from 'trillli_client/src/components/full/routes/TrillliRoutes'

const AppRouter = ({ config }) => {
    const app_logo_path = "./src/assets/logos/logo-sparrow.png"
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<TrillliRoutes config={config} />}/>
                <Route path="/alarms" element={<AlarmsHome />}/>
            </Routes>
        </Router>
        
    );
};

export default AppRouter