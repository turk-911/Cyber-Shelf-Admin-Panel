import React, { useEffect, useState } from "react";
import axios from "axios";
import FileCard from "../../File Card/Card";
import { File } from "../../../../../utils";
import "./ReviewSubmissions.css";
import { BASE_URL } from "../../../utils";
import { useNavigate } from "react-router-dom";
const UploadedFilesScreen: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState("Home");
  const navigate = useNavigate();

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        console.log("No email found in local storage");
        return;
      }
      const response = await axios.get(
        `${BASE_URL}/uploads/get-all-files/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFiles(response.data.uploadedFiles);
    } catch (error) {
      console.error("Error fetching files", error);
      alert("Unable to fetch files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleNavigation = (screen: string) => {
    setActiveScreen(screen);
    if (screen === "Home") return;
    navigate(`/${screen.toLowerCase()}`);
  };

  if (loading) {
    return (
      <div className="loader">
        <p>Loading files...</p>
      </div>
    );
  }

  return (
    <div className="uploaded-files-container">
      <div className="files-list">
        {files.map((file) => (
          <FileCard
            key={file._id.toString()}
            driveLink={file.driveLink}
            semester={file.semester}
            subject={file.subject}
            year={file.year}
          />
        ))}
      </div>
    </div>
  );
};

export default UploadedFilesScreen;
