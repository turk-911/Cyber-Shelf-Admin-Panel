import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpaceCanvas from "../Canvas/SpaceCanvas";
import "./Auth.css";
import axios from "axios";
import { BASE_URL } from "../../utils";

const SignupPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleClick = async () => {
    if (otp === "") {
      window.alert("Please enter the OTP");
      return;
    }
    try {
        console.log("from otp.tsx");
        const email = await localStorage.getItem("userEmail");
        console.log(email);
        const name = await localStorage.getItem("username");
        console.log("name");
        const password = await localStorage.getItem("userPassword");
        console.log("password");
      const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
        email,
        name, 
        otp,
        password
      });
      const { token, user } = response.data;
      window.alert("Verification success, user registered");
      localStorage.setItem("token", token);
      navigate("/admin");
    } catch (error) {
      console.error("Could not verify");
      window.alert("Invalid or expired OTP, please try again");
    }
  };
  return (
    <div className="auth-wrapper">
      <SpaceCanvas />
      <div className="auth-container">
        <div className="auth-box">
          <h1 className="auth-title">Enter the OTP</h1>
          <form>
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter 6 digit OTP"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button type="submit" className="auth-button" onClick={handleClick}>
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
