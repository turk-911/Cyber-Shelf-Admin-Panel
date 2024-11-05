import React, { useState } from "react";
import "./AddNewAssignment.css";
const AddNewAssignment: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [pdfLink, setPdfLink] = useState("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = () => {
    console.log("Uploading:", { title, description, file });
  };
  return (
    <div className="upload-assignments">
      <div className="inner-div">
        <h2>Add new PDF ☄️</h2>
        <input
          type="text"
          placeholder="Enter subject name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="text" placeholder="Paste pdf link here" value={pdfLink} onChange={(e) => setPdfLink(e.target.value)}/>
        {/* <textarea
          placeholder="Assignment Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Add PDF ☄️</button>
      </div>
    </div>
  );
};
export default AddNewAssignment;