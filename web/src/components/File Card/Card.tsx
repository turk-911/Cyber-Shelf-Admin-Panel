import React from "react";
import { FileCardProps } from "../../../../utils";
import "./Card.css"
const FileCard: React.FC<FileCardProps> = ({
  driveLink,
  year,
  semester,
  subject,
}) => {
  return (
    <div className="file-card">
      <a
        href={driveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="file-link"
      >
        {driveLink}
      </a>
      <p className="file-detail">Semester: {semester}</p>
      <p className="file-detail">Subject: {subject}</p>
      <p className="file-detail">Year: {year}</p>
    </div>
  );
};
export default FileCard;