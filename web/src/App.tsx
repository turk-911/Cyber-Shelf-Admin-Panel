import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import SignupPage from "./components/Authentication/SignupPage";
import LoginPage from "./components/Authentication/LoginPage";
import "./App.css";
import HeroPage from "./components/Hero/HeroPage";
import AdminPortal from "./components/Admin/AdminPage";
import { ThemeProvider } from "./components/Context/ThemeContext";
import OTP from "./components/Authentication/OTP";
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/otp" element={<OTP />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );

};

export default App;
