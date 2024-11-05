// App.tsx
import React, { useState } from "react";
import "./PDFUpload.css"; // Importing your styles for space and light themes

interface UploadProps {
  subject: string;
  pdfLink: string;
}

const PDFUpload: React.FC = () => {
  const [subject, setSubject] = useState<string>("");
  const [pdfLink, setPdfLink] = useState<string>("");
  const [uploads, setUploads] = useState<UploadProps[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  const handleUpload = () => {
    if (subject && pdfLink) {
      setUploads([...uploads, { subject, pdfLink }]);
      setSubject("");
      setPdfLink("");
    } else {
      alert("Please fill in both fields");
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div
      className={`app-container ${isDarkTheme ? "dark-theme" : "light-theme"}`}
    >
      <button className="theme-toggle" onClick={toggleTheme}>
        Switch to {isDarkTheme ? "Light" : "Dark"} Theme
      </button>

      <div className="upload-form">
        <h2>Upload PDF</h2>
        <input
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="url"
          placeholder="Enter PDF link"
          value={pdfLink}
          onChange={(e) => setPdfLink(e.target.value)}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div className="uploads-list">
        <h3>Recent Uploads</h3>
        <ul>
          {uploads.map((upload, index) => (
            <li key={index}>
              <strong>{upload.subject}:</strong>{" "}
              <a href={upload.pdfLink}>{upload.pdfLink}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PDFUpload;
