import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IssueView = ({ issue, token, setContent, issues }) => {
  const [assigned_to, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [priority, setPriority] = useState("");
  const [lecturers, setLecturers] = useState([]);
  const [isssue, setIssue] = useState({});

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get('http://aitsmak.up.railway.app/lecturers/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLecturers(response.data);
      } catch (error) {
        console.error("Failed to fetch lecturers", error);
      }
    };

    fetchLecturers();
  }, [token]);

  useEffect(() => {
    function getIssue() {
      for (let isssue of Object.values(issues)) {
        if (isssue.id === issue) {
          return isssue;
        }
      }
      return {}; // fallback if not found
    }

    setIssue(getIssue());
  }, [issues, issue]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent form reload
    try {
      await axios.patch(
        `http://aitsmak.up.railway.app/issues/assign/${issue}/`,
        {
          assigned_to,
          priority,
          deadline: deadline ? deadline.toISOString().split('T')[0] : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent("NewIssues");
    } catch (error) {
      console.error("Failed to assign issue", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "assigned-to") {
      setAssignedTo(value);
    } else if (name === "Priority") {
      setPriority(value);
    } else {
      setDeadline(value);
    }
  };

  return (
    <div className="viewcontainer">
      <div className="viewarea">
        <p><span className="h1">Title: </span>{isssue.title}</p>
        <p><span className="h1">Category: </span>{isssue.category}</p>
        <p><span className="h1">Creator: </span>{isssue.created_at}</p>
        <p><span className="h1">Description: </span>{isssue.description}</p>
        <p><span className="h1">Course Unit: </span>{isssue.course_unit}</p>
        <p><span className="h1">Department: </span>{isssue.department}</p>
        <p><span className="h1">Created by: </span>{isssue.created_by}</p>
      </div>

      <div className="assignarea">
        <form className="formcontainer" onSubmit={handleSubmit}>
          <div className="inputrows">
            <select
              name="assigned-to"
              value={assigned_to}
              onChange={handleChange}
              required
              className="inputinputs"
            >
              <option value="">Select</option>
              {lecturers.map((lect) => (
                <option key={lect.id} value={lect.id}>
                  {lect.first_name} {lect.last_name}
                </option>
              ))}
            </select>
          </div>

          <div className="inputrows">
            <select
              name="Priority"
              value={priority}
              onChange={handleChange}
              required
              className="inputinputs"
            >
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="inputrows">
            <DatePicker
              className="inputinputs"
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              placeholderText="Select Deadline"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <button className="formbuttons" type="submit">
            Assign
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueView;
