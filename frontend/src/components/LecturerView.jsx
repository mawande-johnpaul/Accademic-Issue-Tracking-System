import { useState } from "react";
import axios from "axios";

const LecturerView = ({ issue, token, setContent, issues }) => {
  const currentIssue = issues.find((iss) => iss.id === issue);
  if (!currentIssue) return <p>Issue not found</p>;

  const [progress, setProgress] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProgress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.patch(
        `https://aitsmak.up.railway.app/issues/progress/${issue}/`,
        { progress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent("AssignedIssues");
    } catch (err) {
      setError("Failed to submit progress. Please try again.");
    } finally {
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
