import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Grievance from './components/Grievance';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/grievance" element={<Grievance />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;