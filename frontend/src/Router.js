import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Login from './components/Login'
import Grievance from './components/Grievance';
import Admin from './components/Admin';
import Missing from './components/Missing'

const ROLES = {
    'User': 2001,
    'Admin': 5150
}

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}>
                    {/* Public route */}
                    <Route path='login' element={<Login />} />;
                    {/* Private routes */}
                    {/* The below is for the user */}
                    <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                        <Route path="/" element={<Grievance />} />
                    </Route>
                    {/* The below is for the admin */}
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                        <Route path="/" element={<Admin />} />
                    </Route>
                    {/* catch everything else */}
                    <Route path='*' element={<Missing />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;