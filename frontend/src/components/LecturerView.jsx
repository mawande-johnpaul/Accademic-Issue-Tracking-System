import { useState } from "react";
import axios from "axios";

// Component for a lecturer to view and update progress on a single issue
const LecturerView = ({ issue, token, setContent, issues, backend }) => {
  // Find the current issue from the list using its ID
  const currentIssue = issues.find((iss) => iss.id === issue);
  if (!currentIssue) return <p>Issue not found</p>;    // Show error if issue not found

  // Local state to manage progress input, loading status, and error message
  const [progress, setProgress] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle progress input change
  const handleChange = (e) => {
    setProgress(e.target.value);
  };

   // Handle form submission to update progress
  const handleSubmit = async (e) => {
    e.preventDefault();    // Prevent default form behavior
    setError(null);     // Reset any previous error
    setLoading(true);     // Show loading state during request

    try {
       // Send PATCH request to update issue progress
      await axios.patch(
        `${backend}/issues/progress/${issue}/`,
        { progress },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Auth token
          },
        }
      );
      // Go back to assigned issues list after successful submission
      setContent("AssignedIssues");
    } catch (err) {
      // Show error if request fails
      setError("Failed to submit progress. Please try again.");
    } finally {
      // Stop loading indicator
      setLoading(false);
    }
  };

  return (
    <div className="viewcontainer">
      <div className="viewarea">
        <p>
          <span className="h1">Title: </span>
          {currentIssue.title}
        </p>
        <p>
          <span className="h1">Category: </span>
          {currentIssue.category}
        </p>
        <p>
          <span className="h1">Creator: </span>
          {currentIssue.created_by}
        </p>
        <p>
          <span className="h1">Created on: </span>
          {new Date(currentIssue.created_at).toLocaleDateString()}
        </p>
        <p>
          <span className="h1">Description: </span>
          {currentIssue.description}
        </p>
        <p>
          <span className="h1">Course Unit: </span>
          {currentIssue.course_unit}
        </p>
        <p>
          <span className="h1">Department: </span>
          {currentIssue.department}
        </p>
      </div>
      <div className="assignarea">
        <form className="formcontainer" onSubmit={handleSubmit}>
          <div className="inputrows">
            <input
              name="progress"
              value={progress}
              onChange={handleChange}
              required
              className="inputinputs"
              placeholder="Progress here..."
              disabled={loading}
            />
          </div>
          <button className="formbuttons" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Report"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LecturerView;
