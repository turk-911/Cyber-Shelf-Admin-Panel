import React from "react";
import SpaceCanvas from "../Canvas/SpaceCanvas";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import "./HeroPage.css";

import Slider from "../Slider/Slider";
const HeroPage: React.FC = () => {
  const navigate = useNavigate();
  const handlePress = () => {
    navigate("/login");
  };
  return (
    <div className="auth-wrapper">
      <SpaceCanvas />
      <Header />
      <div className="hero-section">
        <h1 className="hero-heading">
          Admin Uploads just got easier
        </h1>
        <p className="hero-tagline">Login using College Credentials </p>
        <button onClick={handlePress} className="header-button hero-button">
          Start uploading
        </button>
      </div>

      <Slider />
    </div>
  );
};
export default HeroPage;
