import React, { useState } from "react";
import UploadAssignments from "./AddNewAssignment/AddNewAssignment"; 
import AssignmentReview from "./ReviewSubmissions/ReviewSubmissions"; 
import "./Admin.css";
import DaylightCanvas from "../Canvas/DayLightCanvas";
import SpaceCanvas from "../Canvas/SpaceCanvas";
const AdminPortal: React.FC = () => {
  const [light, setLight] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<"upload" | "review">("upload");
  const handleNavClick = (view: "upload" | "review") => {
    setCurrentView(view);
  };
  return (
    <div className="auth-wrapper">
      {light && <DaylightCanvas />}
      {!light && <SpaceCanvas />}
      <div className="admin-portal">
        <header className={`admin-header ${light ? "light" : "dark-header"}`}>
          <h1>Palace of Cosmic Guardians 🧑‍🚀</h1>
          <nav>
            <button className="toggle-btn" onClick={() => setLight(!light)}>
              {light && "🌝"}
              {!light && "☀️"}
            </button>
            {/* <button onClick={() => handleNavClick("upload")}>
              Upload PDF
            </button> */}
            {/* <button onClick={() => handleNavClick("review")}>
              Review Students
            </button> */}
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
