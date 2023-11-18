import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import logoImage from '../images/logo_.jpg';
import userImage from '../images/user_P.jpg';
import lockImage from '../images/lock_P.jpg';

import axios from '../api/axios';
const LOGIN_URL = '/auth';
export let loginDetails = {
  userName: null,
  pwd: null
};

const Login = () => {

  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    loginDetails.userName = user;
    loginDetails.password = pwd;

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');

      if (roles === 2001)
        navigate('/grievance');
      else if (roles === 5150)
        navigate('/admin');
      else
        navigate('/missing');

    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };



  return (
    <>
      <div className='body1'>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-sm-8 col-lg-4">
              <div className="login-container p-4">
                <img src={logoImage} alt="Profile Image" className="profile-image" />
                <h1 className="text-center mb-4">State Bank Of Blue</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="form-control-container">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => { setUser(e.target.value) }}
                        value={user}
                        name="username"
                        required
                        maxLength={12}
                        minLength={12} />
                      <label className="label-float" htmlFor="username">A/c Number</label>
                      <img src={userImage} alt="Msg icon" className="iconInput" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-control-container">
                      <input
                        type="password"
                        className="form-control password-icon"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        name="password"
                        required />
                      <label className="label-float" htmlFor="password">
                        Password
                      </label>
                      <img src={lockImage} alt="Lock Icon" className="iconInput" />
                    </div>
                  </div>
                  <button
                    className="btn
                       btn-primary 
                       btn-block 
                       login-button"
                    type="submit">
                    Login
                  </button>
                </form>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive" style={{ color: "red", backgroundColor: "light-blue", textAlign: "center", marginTop: "1rem" }}>{errMsg}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login