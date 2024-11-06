import React, { useState } from "react";
import UploadAssignments from "./AddNewAssignment/AddNewAssignment"; 
import AssignmentReview from "./ReviewSubmissions/ReviewSubmissions"; 
import "./Admin.css";
import DaylightCanvas from "../Canvas/DayLightCanvas";
import SpaceCanvas from "../Canvas/SpaceCanvas";
import { useNavigate } from "react-router-dom";
const AdminPortal: React.FC = () => {
  const navigate = useNavigate();
  const [light, setLight] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<"upload" | "review">("upload");
  const handleNavClick = (view: "upload" | "review") => {
    setCurrentView(view);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login"); 
  };
  return (
    <div className="auth-wrapper">
      {light && <DaylightCanvas />}
      {!light && <SpaceCanvas />}
      <div className="admin-portal">
        <header className={`admin-header ${light ? "light" : "dark-header"}`}>
          <h1>
            {currentView === "review" ? "Uploaded Files" : "Add New File"}
          </h1>
          <nav>
            <button onClick={() => handleNavClick("upload")}>
              Add New File
            </button>
            <button onClick={() => handleNavClick("review")}>
              View Uploads
            </button>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        </header>
        <main className={`admin-content ${light ? "light-main" : "dark-main"}`}>
          {currentView === "upload" && <UploadAssignments />}
          {currentView === "review" && <AssignmentReview />}
        </main>
      </div>
    </div>
  );
};

export default AdminPortal;
