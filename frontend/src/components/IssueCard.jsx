import axios from "axios";
import { useState } from "react";

const IssueCard = ({ isssue, type, token, content ,setContent, setid}) => {
  const assign = async (identifier, setid, setContent) => {
    setContent('AssignForm');
    setid(identifier);
  };
  const reject = async (identifier) => {
    const response = await axios.delete(`http://127.0.0.1:8000/issues/setstatus/${identifier}/Rejected/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
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
        <div className="card-header">{isssue.title} . {isssue.status} . {isssue.created_at}</div>
        <div className="card-body">
          <div style={{fontWeight:"bold", fontSize: "12px", margin:"auto"}}>{isssue.category}</div>
          <div>{isssue.description}</div>
          <button className="cardbuttons">Remove</button>
          <button className="cardbuttons">Reallocate</button>
          <button className="cardbuttons">Request Report</button>
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
          <button className="cardbuttons">Report</button>
          <button className="cardbuttons">View</button>
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
  
  