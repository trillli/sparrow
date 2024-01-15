import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AlarmsHome from '../pages/AlarmsHome'
import TrillliRoutes from 'trillli_client/src/components/routes/TrillliRoutes'

const AppRoutes = () => {
    const app_logo_path = "./src/assets/logos/logo-sparrow.png"
    return (
        <Router basename='go'>
            <Routes>
                <Route path="/*" element={<TrillliRoutes />}></Route>
                <Route path="/alarms" element={<AlarmsHome />}/>
            </Routes>
        </Router>
        
    );
};

export default AppRoutes