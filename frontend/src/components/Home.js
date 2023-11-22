import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-sm-8 col-lg-4">
                    <div className="login-container p-4">
                        <h1>Home</h1>
                        <br />
                        <p>You are logged in!</p>
                        <br />
                        <Link to="/grievance">Go to the Grievance page</Link>
                        <br />
                        <Link to="/admin">Go to the Admin page</Link>
                        <br />
                        <Link to="/linkpage">Go to the link page</Link>
                        <br />
                        <br />
                        <button type="button" className="btn btn-info" onClick={logout}>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home