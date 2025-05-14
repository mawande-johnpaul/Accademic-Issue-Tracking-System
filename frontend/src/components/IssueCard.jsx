import axios from "axios";
import { useState } from "react";

const IssueCard = ({ isssue, type, token, setContent, setid}) => {
  const assign = async (identifier, setid, setContent) => {
    setid(identifier);
    setContent('AssignForm');
  };
  const progress_set = async (identifier, setid) => {
    setid(identifier);
    setContent('LecturerView');
  };
  const reject = async (identifier, setContent) => {
    const response = await axios.delete(`https://aitsmak.up.railway.app/issues/remove/${identifier}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    setContent("NewIssues")
}
const markAsDone = async (identifier, setContent) => {
  const response = await axios.delete(`https://aitsmak.up.railway.app/issues/remove/${identifier}/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  setContent("NewIssues")
}

const notify = async (identifier, setContent) => {
  const response = await axios.post(`https://aitsmak.up.railway.app/issues/notify/${identifier}/lecturer_notify/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  setContent("NewIssues")
}

  if (type === 'user'){
    return (
      <div className="issue-card">
        <div className="card-header">{isssue.title} . {isssue.status} . {isssue.created_at}</div>
        <div className="card-body">
          <div style={{fontWeight:"bold", fontSize: "12px", margin:"auto"}}>{isssue.category}</div>
          <div>{isssue.description}</div>
        </div>
      </div>
    );
  }

  if (type === 'new'){
    return (
      <div className="issue-card" key={isssue.pk}>
        <div className="card-header">{isssue.title} . {isssue.created_at} . {isssue.created_by}</div>
        <div className="card-body">
          <div style={{fontWeight:"bold", fontSize: "12px", margin:"auto"}}>{isssue.category}</div>
          <div>{isssue.description}</div>
          <button className="cardbuttons" style={{backgroundColor:"red"}} onClick={() => reject(isssue.id, setid, setContent)}>Reject</button>
          <button className="cardbuttons" style={{backgroundColor:"#00DF81"}} onClick={() => assign(isssue.id, setid, setContent)}>View</button>
        </div>
      </div>
    );
  }

  if (type === 'assigned'){
    return (
      <div className="issue-card">
        <div className="card-header">{isssue.category} . {isssue.created_at}</div>
        <div className="card-body">
          <div style={{fontWeight:"bold", fontSize: "12px", margin:"auto"}}>{isssue.title}</div>
          {
            isssue.progress ? (
              <div><b>Progress:</b> {isssue.progress}</div>
            ) : (
              <div><b>Progress:</b> No response from lecturer yet.</div>
            )
          }
          
          <button className="cardbuttons" style={{backgroundColor:"red"}} onClick={() => markAsDone(isssue.id, setid, setContent)}>Mark as Resolved</button>
          <button className="cardbuttons" style={{backgroundColor:"#00DF81"}} onClick={() => assign(isssue.id, setid, setContent)}>Reallocate</button>
          <button className="cardbuttons" style={{backgroundColor:"#00DF81"}} onClick={() => notify(isssue.id, setid, setContent)}>Request Report</button>
        </div>
      </div>
    );
  }

  if (type === 'lecturer-assigned'){
    return (
      <div className="issue-card">
        <div className="card-header">{isssue.title} . {isssue.status} . {isssue.created_at}</div>
        <div className="card-body">
          <div style={{fontWeight:"bold", fontSize: "12px", margin:"auto"}}>{isssue.category}</div>
          <div>{isssue.description}</div>
          <button className="cardbuttons" style={{backgroundColor:"#00DF81"}}  onClick={() => progress_set(isssue.id, setid)}>View</button>
        </div>
        
      </div>
    );
  }

  if (type === 'lecturer-resolved'){
    return (
      <div className="issue-card">
        <div className="card-header">{isssue.title} . {isssue.status} . {isssue.created_at}</div>
        <div className="card-body">
          <div style={{fontWeight:"bold", fontSize: "12px", margin:"auto"}}>{isssue.category}</div>
          <div>{isssue.description}</div>
          <button className="cardbuttons">Re open</button>
        </div>
        
      </div>
    );
  }
  };

  export default IssueCard;

