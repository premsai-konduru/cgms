// import React, { useEffect } from 'react';
// import { useNavigate, Outlet } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';

// const RequireAuth = ({ allowedRoles, component: Component }) => {
//     const { auth } = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!auth?.roles?.find(role => allowedRoles?.includes(role))) {
//             if (auth?.user) {
//                 // Use useEffect to call navigate
//                 navigate("/unauthorized", { replace: true });
//             } else {
//                 // Use useEffect to call navigate
//                 navigate("/login", { replace: true });
//             }
//         }
//     }, [auth, allowedRoles, navigate]);

//     // Return the component if the conditions are met
//     return auth?.roles?.find(role => allowedRoles?.includes(role)) ? <Component /> : null;
// }

// export default RequireAuth;

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    //console.log("Allowed roles = ",allowedRoles);
    //console.log("auth.roles = ",auth.roles);
    let exists = false;
    if(auth?.roles){
        allowedRoles.forEach(role => {
            if(allowedRoles?.includes(role)){
                exists = true;
            }
        });
    }

    return (
        exists
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;