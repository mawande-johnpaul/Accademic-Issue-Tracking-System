import { useState } from "react";
import axios from "axios";

const IssueView = ({issue, lecturers, token, setContent}) => {

  const [assigned_to, setAssignedTo] = useState("")
  const [deadline, setDeadline] = useState("")
  const [priority, setPriority] = useState("")

  const handleSubmit = async ({lecturer, priority, deadline}) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/issues/assign/${issue}`,
      {lecturer, priority, deadline},
      {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      }
    )
    const response2 = await axios.patch(`http://127.0.0.1:8000/issues/setstatus/${identifier}/Seen/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    setContent("NewIssues")
  }

  return (
    <div className="viewcontainer">
      <div className="viewarea">

      </div>
      <div className="assignarea">
        <form className="formcontainer">
            <select
                name="assigned-to"
                value={assigned_to}
                onChange={setAssignedTo(e.target.value)}
                required
                className="inputinputs"
                placeholder="Lecturer">
                    {lecturers.map((lecturer) => (
                        <option key={lecturer.id} value={lecturer.id}>
                            {lecturer.first_name} {lecturer.last_name}
                        </option>
                    ))}                  
            </select>
            <select
                name="Priority"
                value={priority}
                onChange={setPriority(e.target.value)}
                required
                className="inputinputs"
                placeholder="Priority">
                    <option value={"Low"}>Low</option>      
                    <option value={"Medium"}>Low</option> 
                    <option value={"High"}>Low</option>          
            </select>
            <input 
            className="inputinputs" 
            placeholder="Deadline YYYY-MM-DD" 
            value={deadline}
            onChange={setDeadline(e.target.value)}
            ></input>
            <button className="formbuttons" type="submit" onClick={handleSubmit(assigned_to, priority, deadline)}>Assign</button>
        </form>
      </div>
    </div>
  );
};

export default IssueView;
