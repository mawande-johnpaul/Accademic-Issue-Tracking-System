import axios from "axios";
import { useState } from "react";

const IssueCard = ({ issue, type, token, setContent, setid, backend }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!issue || !type) {
    return null; // Defensive: nothing to render if missing props
  }

  const assign = (identifier) => {
    console.log(identifier)
    setid(identifier);
    setContent("AssignForm");
  };

  const progress_set = (identifier) => {
    setid(identifier);
    setContent("LecturerView");
  };

  const reject = async (identifier) => {
    setError(null);
    setLoading(true);
    try {
      await axios.delete(
        `${backend}issues/remove/${identifier}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent("NewIssues");
    } catch {
      setError("Failed to reject issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const markAsDone = async (identifier) => {
    setError(null);
    setLoading(true);
    try {
      await axios.delete(
        `${backend}/issues/remove/${identifier}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent("NewIssues");
    } catch {
      setError("Failed to mark issue as resolved. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const notify = async (identifier, lect) => {
    setError(null);
    setLoading(true);
    try {
      await axios.post(
        `${backend}/issues/notify/${identifier}/${lect}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Lecturer has been notified!")
      setContent("Splash2");
    } catch {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Render UI per type
  if (type === "user") {
    return (
      <div className="issue-card">
        <div className="card-header">
          {issue.title} . {issue.status}
        </div>
        <div className="card-body">
          <div style={{ fontWeight: "bold", fontSize: "12px", margin: "auto" }}>
            {issue.category}
          </div>
          <div>{issue.description}</div>
        </div>
      </div>
    );
  }

  if (type === "new") {
    return (
      <div className="issue-card" key={issue.pk}>
        <div className="card-header">
          {issue.title} . {issue.created_at} . {issue.created_by}
        </div>
        <div className="card-body">
          <div style={{ fontWeight: "bold", fontSize: "12px", margin: "auto" }}>
            {issue.category}
          </div>
          <div>{issue.description}</div>
          {error && <div className="error-message">{error}</div>}
          <button
            className="cardbuttons"
            style={{ backgroundColor: "red", color:"white" }}
            onClick={() => reject(issue.id)}
            disabled={loading}
          >
            {loading ? "Processing..." : "Reject"}
          </button>
          <button
            className="cardbuttons"
            style={{ backgroundColor: "#00DF81" }}
            onClick={() => assign(issue.id)}
            disabled={loading}
          >
            View
          </button>
        </div>
      </div>
    );
  }

  if (type === "assigned") {
    return (
      <div className="issue-card">
        <div className="card-header">
          {issue.category} . {issue.created_at}
        </div>
        <div className="card-body">
          <div style={{ fontWeight: "bold", fontSize: "12px", margin: "auto" }}>
            {issue.title}
          </div>
          {issue.progress ? (
            <div>
              <b>Progress:</b> {issue.progress}
            </div>
          ) : (
            <div>
              <b>Progress:</b> No response from lecturer yet.
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button
            className="cardbuttons"
            style={{ backgroundColor: "red" }}
            onClick={() => markAsDone(issue.id)}
            disabled={loading}
          >
            {loading ? "Processing..." : "Mark as Resolved"}
          </button>
          <button
            className="cardbuttons"
            style={{ backgroundColor: "#00DF81" }}
            onClick={() => assign(issue.id)}
            disabled={loading}
          >
            Reallocate
          </button>
          <button
            className="cardbuttons"
            style={{ backgroundColor: "#00DF81" }}
            onClick={() => notify(issue.id, issue.assigned_to)}
            disabled={loading}
          >
            Request Report
          </button>
        </div>
      </div>
    );
  }

  if (type === "lecturer-assigned") {
    return (
      <div className="issue-card">
        <div className="card-header">
          {issue.title} . {issue.status} . {issue.created_at}
        </div>
        <div className="card-body">
          <div style={{ fontWeight: "bold", fontSize: "12px", margin: "auto" }}>
            {issue.category}
          </div>
          <div>{issue.description}</div>
          <button
            className="cardbuttons"
            style={{ backgroundColor: "#00DF81" }}
            onClick={() => progress_set(issue.id)}
            disabled={loading}
          >
            View
          </button>
        </div>
      </div>
    );
  }

  if (type === "lecturer-resolved") {
    return (
      <div className="issue-card">
        <div className="card-header">
          {issue.title} . {issue.status} . {issue.created_at}
        </div>
        <div className="card-body">
          <div style={{ fontWeight: "bold", fontSize: "12px", margin: "auto" }}>
            {issue.category}
          </div>
          <div>{issue.description}</div>
          <button className="cardbuttons" disabled>
            Re open
          </button>
        </div>
      </div>
    );
  }

  return null; // Fallback in case no type matched
};

export default IssueCard;
