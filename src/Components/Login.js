import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import axios from "axios"; // To make API requests
import "../App.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginUSer } from "../services/services";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiData = {
      email,
      password,
    };
    loginUSer(apiData)
      .then((res) => {
        const { user, token } = res;
        dispatch(login({ user, token }));
        navigate("/dashboard");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setLoading(false);
      })
      .finally((res) => {
        setLoading(false);
      });
  };




  // Example usage

  
  return (
    <div className="login-container">
      <div className="left-image">
        <img
          src="https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login"
          style={{height:"100%"}}
        />
      </div>
      <div className="right-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        
        </form>
      </div>
    </div>
  );
};

export default Login;
