import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IssueView = ({ issue, token, setContent, issues, backend}) => {
  const [assignedTo, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [priority, setPriority] = useState("");
  const [issueData, setIssueData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    const foundIssue = Object.values(issues).find((iss) => iss.id === issue) || {};
    setIssueData(foundIssue);
    axios.get(`${backend}/lecturers/${issue}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setLecturers(response.data);
    })
    .catch((error) => {
      console.error("Failed to fetch lecturers:", error);
    });

  }, []);

  const assignIssue = async (e) => {
    e.preventDefault();

    if (!assignedTo || !deadline || !priority) {
      alert("All fields are required to assign an issue.");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.patch(
        `${backend}/issues/assign/${issue}/`,
        {
          assigned_to: assignedTo,
          priority,
          deadline: deadline.toISOString().split("T")[0],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Issue assigned successfully.");
      setContent("NewIssues");
    } catch (error) {
      console.error("Failed to assign issue", error);
      alert("Failed to assign issue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="viewcontainer">
      <div className="viewarea">
        <p>
          <span className="h1">Title: </span>
          {issueData.title || "N/A"}
        </p>
        <p>
          <span className="h1">Category: </span>
          {issueData.category || "N/A"}
        </p>
        <p>
          <span className="h1">Created At: </span>
          {issueData.created_at || "N/A"}
        </p>
        <p>
          <span className="h1">Description: </span>
          {issueData.description || "N/A"}
        </p>
        <p>
          <span className="h1">Course Unit: </span>
          {issueData.course_unit || "N/A"}
        </p>
        <p>
          <span className="h1">Department: </span>
          {issueData.department || "N/A"}
        </p>
        <p>
          <span className="h1">Created By: </span>
          {issueData.created_by || "N/A"}
        </p>
        {issueData.attachment && (
          <div style={{ margin: "10px 0" }}>
            <span className="h1">Attachment: </span>
            <img
              src={
                issueData.attachment.startsWith("http")
                  ? issueData.attachment
                  : `${backend}${issueData.attachment}`
              }
              alt="Issue Attachment"
              style={{ maxWidth: "400px", maxHeight: "400px", display: "block", marginTop: "5px" }}
            />
          </div>
        )}
      </div>

      <div className="assignarea">
        <form className="formcontainer" onSubmit={assignIssue}>
          <div className="inputrows">
            <select
              name="assigned-to"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
              className="inputinputs"
            >
              <option value="">Select Lecturer</option>
              {lecturers.map((lect) => (
                <option key={lect.id} value={lect.id}>
                  {lect.first_name} {lect.last_name}
                </option>
              ))}
            </select>
          </div>

          <div className="inputrows">
            <select
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
              className="inputinputs"
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="inputrows">
            <DatePicker
              className="inputinputs"
              selected={deadline}
              onChange={setDeadline}
              placeholderText="Select Deadline"
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>

          <button
            className="formbuttons"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Assigning..." : "Assign Issue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueView;
