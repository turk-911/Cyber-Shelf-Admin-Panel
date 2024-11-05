import React, { useState, useEffect } from "react";
import "./ReviewSubmissions.css";
interface Assignment {
  id: number;
  title: string;
  studentName: string;
  submissionDate: string;
  status: string;
}
const ReviewSubmissions: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const fetchAssignments = async () => {
    const mockAssignments: Assignment[] = [
      {
        id: 1,
        title: "Assignment 1",
        studentName: "Arijit Singh",
        submissionDate: "2024-09-10",
        status: "Pending",
      },
      {
        id: 2,
        title: "Assignment 2",
        studentName: "Jamie Smith",
        submissionDate: "2024-09-11",
        status: "Pending",
      },
    ];
    setAssignments(mockAssignments);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="assignment-review">
      <h2>Review the Students here 👽 </h2>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Student Name</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.title}</td>
                <td>{assignment.studentName}</td>
                <td>{assignment.submissionDate}</td>
                <td>
                  {checked
                    ? (assignment.status = "Checked")
                    : (assignment.status = "Pending")}
                </td>
                <td>
                  <button
                    className="view-details-button"
                    onClick={() => setChecked(!checked)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ReviewSubmissions;
