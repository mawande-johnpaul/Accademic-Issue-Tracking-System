import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IssueView = ({issue, token, setContent, issues}) => {

  const [assigned_to, setAssignedTo] = useState([]); // Allow multiple lecturers
  const [deadline, setDeadline] = useState(null); // Use Date object for deadline
  const [priority, setPriority] = useState("")
  const [lecturers, setLecturers] = useState([]);
  const [isssue, setIssue] = useState({});

  useEffect(() => {
    const fetchLecturers = async () => {
      const response = await axios.get('http://127.0.0.1:8000/lecturers/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setLecturers(response.data);
    };
  
    fetchLecturers();
  }, [token]); // Fetch lecturers only when the token changes

  useEffect(() => {
    function getIssue() {
      for (let isssue of Object.values(issues)) {
        if (isssue.id === issue) {
          return isssue;
        }
      }
    }
  
    setIssue(getIssue());
  }, [issues, issue]); // Update issue when issues or issue ID changes

  const handleSubmit = async ({lecturer, priority, deadline}) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/issues/assign/${issue}/`,
      {lecturer, priority, deadline: deadline.toISOString().split('T')[0]}, // Format deadline as YYYY-MM-DD
      {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      }
    )
    
    setContent("NewIssues")
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "assigned-to") {
      setAssignedTo(Array.from(e.target.selectedOptions, option => option.value));
    } else if (name === "Priority") {
      setPriority(value);
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
        <p><span className="h1">Created on: </span>{isssue.created_by}</p>
      </div>
      <div className="assignarea">
        <form className="formcontainer">
          <div className="inputrows">
            <select
                name="assigned-to"
                value={assigned_to}
                onChange={handleChange}
                required
                className="inputinputs"
                placeholder="Lecturer">
                  <option>All</option>
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
                placeholder="Priority">
                    <option value={"Low"}>Low</option>      
                    <option value={"Medium"}>Medium</option> 
                    <option value={"High"}>High</option>          
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
          <button className="formbuttons" type="submit" onClick={() => handleSubmit({lecturer: assigned_to, priority, deadline})}>Assign</button>
        </form>
      </div>
    </div>
  );
};

export default IssueView;
