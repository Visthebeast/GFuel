import React, { useRef , useEffect, useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file for the component
import AuthContext from './context/AuthProvider';
import axios from './api/axios';

const LOGIN_URL = "/auth";

const LoginPage = (() => {
  const {setAuth} = useContext(AuthContext);
  const navigate = useNavigate(); // React Router's navigation hook
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);  
  
  useEffect(() =>{
    userRef.current.focus()
  },[])

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  
  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
    // Assuming login is successful, navigate to DashboardPage
    // navigate('/employee/settled');
  };

  return (
    <div className="login-page-container">
      <div className="background-image">
        <div className="login-form-container">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h2 className="form-heading">Admin Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              ref={userRef}
              onChange={(e) => setUser(e.target.value)}
              value={user}
              placeholder="Email"
              className="form-input"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              placeholder="Password"
              className="form-input"
              required
            />
            <button type="submit" className="form-button">
              Login
            </button>
          </form>
          <p className="register-link">
            Don't have an account? <Link to="/registration">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
})

export default LoginPage;
