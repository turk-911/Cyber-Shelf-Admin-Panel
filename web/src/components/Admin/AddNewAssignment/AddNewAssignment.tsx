import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils";
import db from "../../../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import "./AddNewAssignment.css"
const AddFile: React.FC = () => {
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
      if (response.status === 200 || response.status === 201) {
        alert("Successfully uploaded!");
        const docRef = doc(db, "Subjects", "1_LAL");
        await updateDoc(docRef, {
          Material: arrayUnion({
            "Content URL": pdf,
            Title: subject,
            id: `${selectedSemester}-${
              selectedYear[0]
            }-${selectedBranch}-${Date.now()}`,
          }),
        });
        alert("Successfully updated to firestore");
      } else alert("Upload failed");
    } catch (error) {
      console.error("Upload error", error);
      alert("Error: Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <label className="label">Select Year</label>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="select"
      >
        <option value="1st">1st Year</option>
        <option value="2nd">2nd Year</option>
        <option value="3rd">3rd Year</option>
        <option value="4th">4th Year</option>
      </select>

      <label className="label">Select Branch</label>
      <select
        value={selectedBranch}
        onChange={(e) => setSelectedBranch(e.target.value)}
        className="select"
      >
        <option value="IT">IT</option>
        <option value="IT-BIn">IT-BIn</option>
        <option value="ECE">ECE</option>
      </select>

      <label className="label">Select Semester</label>
      <select
        value={selectedSemester}
        onChange={(e) => setSelectedSemester(e.target.value)}
        className="select"
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

      <label className="label">Subject</label>
      <input
        type="text"
        placeholder="Enter subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="input"
      />

      <label className="label">Google Drive Link</label>
      <input
        type="text"
        placeholder="Paste a Google Drive link here"
        value={pdf}
        onChange={(e) => setPdf(e.target.value)}
        className="input"
      />

      <button onClick={handleSubmit} className="button">
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
