import React from "react";
import SpaceCanvas from "../Canvas/SpaceCanvas";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Slider from "../Slider/Slider";
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const handlePress = () => {
    navigate("/login");
  };
  return (
    <div className="auth-wrapper">
      <SpaceCanvas />
      <Header />
      <div className="hero-section">
        <h1 className="hero-heading">One Stop Archive 🪐</h1>
        <p className="hero-tagline">⭐ For your pyqs, notes and tutorials </p>
        <button onClick={handlePress} className="header-button hero-button">
          Start Studying 🚀
        </button>
      </div>
      <Slider />
    </div>
  );
};
export default LandingPage;
