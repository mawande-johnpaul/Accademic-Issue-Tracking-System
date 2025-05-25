import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Component to view issue details and assign the issue to a lecturer
const IssueView = ({ issue, token, setContent, issues, backend}) => {
  const [assignedTo, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [priority, setPriority] = useState("");
  const [issueData, setIssueData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);  // Submission state
  const [lecturers, setLecturers] = useState([]);    // List of available lecturers

  // Load issue details and available lecturers on mount
  useEffect(() => {
     // Find the issue data from the issues list
    const foundIssue = Object.values(issues).find((iss) => iss.id === issue) || {};
    setIssueData(foundIssue);
    // Fetch lecturers eligible to be assigned to this issue
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

  // Handle assignment form submission
  const assignIssue = async (e) => {
    e.preventDefault();
// Basic validation
    if (!assignedTo || !deadline || !priority) {
      alert("😐 All fields are required to assign an issue.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send patch request to assign the issue
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
      alert("🤗 Issue assigned successfully.");
      setContent("NewIssues");
    } catch (error) {
      console.error("Failed to assign issue", error);
      alert("😥 Failed to assign issue. Please try again.");
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
