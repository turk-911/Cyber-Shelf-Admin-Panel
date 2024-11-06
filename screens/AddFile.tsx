// AddFile.js
import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://your-server-url.com"; // Replace with your backend URL

const AddFile = () => {
  const [selectedYear, setSelectedYear] = useState("1st");
  const [selectedBranch, setSelectedBranch] = useState("IT");
  const [selectedSemester, setSelectedSemester] = useState("1st");
  const [subject, setSubject] = useState("LAL");
  const [pdf, setPdf] = useState("");

  const handleSubmit = async () => {
    if (!subject || !pdf) {
      alert("Please fill in all fields and provide a PDF link.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("userEmail");

      const response = await axios.post(
        `${BASE_URL}/uploads/add`,
        {
          driveLink: pdf,
          semester: selectedSemester,
          year: parseInt(selectedYear[0]),
          branch: selectedBranch,
          subject,
          userEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Successfully uploaded!");
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Error: Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add File</h1>

      <label style={styles.label}>Select Year</label>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        style={styles.select}
      >
        <option value="1st">1st Year</option>
        <option value="2nd">2nd Year</option>
        <option value="3rd">3rd Year</option>
        <option value="4th">4th Year</option>
      </select>

      <label style={styles.label}>Select Branch</label>
      <select
        value={selectedBranch}
        onChange={(e) => setSelectedBranch(e.target.value)}
        style={styles.select}
      >
        <option value="IT">IT</option>
        <option value="IT-BIn">IT-BIn</option>
        <option value="ECE">ECE</option>
      </select>

      <label style={styles.label}>Select Semester</label>
      <select
        value={selectedSemester}
        onChange={(e) => setSelectedSemester(e.target.value)}
        style={styles.select}
      >
        <option value="1st">1st Semester</option>
        <option value="2nd">2nd Semester</option>
        <option value="3rd">3rd Semester</option>
        <option value="4th">4th Semester</option>
        <option value="5th">5th Semester</option>
        <option value="6th">6th Semester</option>
        <option value="7th">7th Semester</option>
        <option value="8th">8th Semester</option>
      </select>

      <label style={styles.label}>Subject</label>
      <input
        type="text"
        placeholder="Enter subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={styles.input}
      />

      <label style={styles.label}>Google Drive Link</label>
      <input
        type="text"
        placeholder="Paste a Google Drive link here"
        value={pdf}
        onChange={(e) => setPdf(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSubmit} style={styles.button}>
        Submit
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "20px",
    color: "#033471",
  },
  label: {
    display: "block",
    fontSize: "16px",
    marginBottom: "5px",
    color: "#001632",
    fontWeight: "600",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #001632",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #001632",
  },
  button: {
    width: "100%",
    padding: "15px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#033471",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AddFile;