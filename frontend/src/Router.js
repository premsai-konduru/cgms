import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Login from './components/Login';
import Grievance from './components/Grievance';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Home from './components/Home';
// import Unauthorized from './components/Unauthorized';

const ROLES = {
    'User': 2001,
    'Admin': 5150
}

// Router.js
const Router = () => {
    console.log("Router rendered");
    return (
        // <BrowserRouter>
        // <Routes>
        //     <Route path='/' element={<Login />} />
        //     <Route path='/login/' element={<Login />} />
        //     <Route
        //         path='/grievance'
        //         element={
        //             <RequireAuth
        //                 allowedRoles={[ROLES.User]}
        //                 component={Grievance}  // Make sure to pass the component class/function, not an instance
        //             />
        //         }
        //     />
        //     <Route
        //         path='/admin'
        //         element={
        //             <RequireAuth
        //                 allowedRoles={[ROLES.Admin]}
        //                 component={Admin}  // Make sure to pass the component class/function, not an instance
        //             />
        //         }
        //     />
        //     <Route path='/missing' element={<Missing />} />
        // </Routes>
        // <BrowserRouter>
        <Routes>
            <Route path='/'>
                {/* <Route path='' element={<Login />} /> */}
                {/* Public route */}
                <Route path='login' element={<Login />} />
                <Route path='unauthorized' element={<Unauthorized />} />
                {/* Private routes */}
                {/* The below is for the user */}
                <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                    <Route path="/" element={<Home />} />
                    <Route path='grievance' element={<Grievance />} />
                </Route>
                {/* The below is for the admin */}
                <Route path='' element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                    <Route path="admin" element={<Admin />} />
                </Route>
                {/* catch everything else */}
                <Route path='*' element={<Missing />} />
            </Route>
        </Routes>
    );
};

export default Router;
