import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    console.log("Here in require auth");
    if (auth?.roles?.find(role => allowedRoles?.includes(role))) {
        console.log("for outlet");
        return <Outlet />;
    } else if (auth?.user) {
        console.log("for unauthorized");
        navigate("/unauthorized", { replace: true });
        return null; // or some loading/error message if needed
    } else {
        console.log("Authlogin");
        navigate("/login", { replace: true });
        return null; // or some loading/error message if needed
    }
}

export default RequireAuth;
