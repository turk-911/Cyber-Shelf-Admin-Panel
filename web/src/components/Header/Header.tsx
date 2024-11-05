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
    navigate('/login');
  }
  return (
    <div className="top-div">
      <header className="navbar">
        <div className="navbar-logo">Cyber Shelf Admin</div>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <button className="header-button" onClick={handleLogin}>
            Login
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
