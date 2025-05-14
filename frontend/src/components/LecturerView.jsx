import { useState } from "react";
import axios from "axios";

const LecturerView = ({issue, token, setContent, issues}) => {
  const isssue = issues.find((iss) => iss.id === issue);
  if (!isssue) return null; // Handle case where issue is not found
  const [progress, setProgress] = useState("");

  const handleChange = (e) => {
    setProgress(e.target.value)
  };

    const handleSubmit = async ({progress}) => {
        const response = await axios.patch(
        `http://aitsmak.up.railway.app/issues/progress/${issue}/`,
        {progress},
        {
            headers:{
            Authorization: `Bearer ${token}`,
            }
        }
        )
        
        setContent("AssignedIssues")
    }

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
                <input
                    name="progress"
                    value={progress}
                    onChange={handleChange}
                    required
                    className="inputinputs"
                    placeholder="Progress here.."></input>
            </div>
            <button className="formbuttons" type="submit" onClick={() => handleSubmit({progress})}>Report</button>
        </form>

      </div>
    </div>
  );
};

export default LecturerView;
