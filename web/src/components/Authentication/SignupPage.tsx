import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpaceCanvas from "../Canvas/SpaceCanvas";
import "./Auth.css";
import axios from "axios";
import { BASE_URL } from "../../utils";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    if(name === "" || email === "" || password === "") {
      window.alert("Please fill out all the fields");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name, 
        email,
        password,
      });
      if(response.status === 200) {
        window.alert("OTP sent, please check your email for verification");
        const userPassword = password;
        const username = name;
        localStorage.setItem("userPassword", userPassword);
        localStorage.setItem("username", username);
        localStorage.setItem("userEmail", email);
        navigate('/otp');
      }
    } catch (error) {
      console.error("Signup error");
      window.alert("Signup error, please try again");
    }
  }
  return (
    <div className="auth-wrapper">
      <SpaceCanvas />
      <div className="auth-container">
        <div className="auth-box">
          <h1 className="auth-title">Sign Up</h1>
          <form>
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="auth-button" onClick={handleSignup}>
              Sign Up 🚀
            </button>
          </form>
          <div className="signup-link">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
