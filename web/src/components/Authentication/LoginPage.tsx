import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpaceCanvas from "../Canvas/SpaceCanvas";
import "./Auth.css";
import axios from "axios";
import { BASE_URL } from "../../utils";
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleClick() {
    if (email === "" || password === "") {
      window.alert("Both email and password are required");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      const { token, user, userEmail } = response.data;
      console.log("User Email: ", userEmail);
      await localStorage.setItem("token", token);
      await localStorage.setItem("userEmail", userEmail);
      const mail = await localStorage.getItem("userEmail");
      console.log("Email set in local storage: ", mail);
      window.alert("Login successful");
      navigate("/admin");
    } catch (error) {
      console.error("Login error", error);
      window.alert("Login failed, invalid credentials");
    }
  }
  return (
    <div className="auth-wrapper">
      <SpaceCanvas />
      <div className="auth-container">
        <div className="auth-box">
          <h1 className="auth-title">Login</h1>
          <form>
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="button" className="auth-button" onClick={handleClick}>
              Login 🚀
            </button>
          </form>
          <div className="signup-link">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
