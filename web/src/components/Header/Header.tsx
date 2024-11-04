import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="top-div">
      <header className="navbar">
        <div className="navbar-logo">PrepArchives 🚀</div>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <button className="header-button" onClick={handleLogin}>
            Get Started
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
