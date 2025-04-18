import axios from "axios";
import setContent from "./RegistrarPage";
import { useState } from "react";

const IssueCard = ({ isssue, type, token}) => {
  const assign = async ({identifier}) => {
    const response = await axios.patch(`http://127.0.0.1:8000/issues/setstatus/${identifier}/Seen`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    setContent('AssignForm');
  }
  const reject = async (identifier) => {
    const response = await axios.delete(`http://127.0.0.1:8000/issues/setstatus/${identifier}/Rejected`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
}

  if (type === 'user'){
    return (
      <div className="issue-card">
        <div className="card-header">{isssue.title} . {isssue.status} . {isssue.created_at}</div>
        <div className="card-body" style={{fontWeight:"bold", fontSize: "12px"}}>{isssue.category}</div>
        <div className="card-body">{isssue.description}</div>
      </div>
    );
  }

  if (type === 'new'){
    return (
      <div className="issue-card">
        <div className="card-header">{isssue.title} . {isssue.created_at} . {isssue.created_by}</div>
        <div className="card-body" style={{fontWeight:"bold", fontSize: "12px"}}>{isssue.category}</div>
        <div className="card-body">{isssue.description}</div>
        <button className="cardbuttons" onClick={() => reject(isssue.pk)}>Reject</button>
        <button className="cardbuttons" onClick={() => console.log(isssue.pk)}>Assign</button>
      </div>
    );
  }

  if (type === 'assigned'){
    return (
      <div className="issue-card">
        <div className="card-header">{isssue.title} . {isssue.status} . {isssue.created_at}</div>
        <div className="card-body" style={{fontWeight:"bold", fontSize: "12px"}}>{isssue.category}</div>
        <div className="card-body">{isssue.description}</div>
        <button className="cardbuttons">Remove</button>
        <button className="cardbuttons">Reallocate</button>
        <button className="cardbuttons">Request Report</button>
      </div>
    );
  }

  if (type === 'lecturer-assigned'){
    return (
      <div className="issue-card">
        <div className="card-header">{isssue.title} . {isssue.status} . {isssue.created_at}</div>
        <div className="card-body" style={{fontWeight:"bold", fontSize: "12px"}}>{isssue.category}</div>
        <div className="card-body">{isssue.description}</div>
        <button className="cardbuttons">Report</button>
        <button className="cardbuttons">View</button>
      </div>
    );
  }

  if (type === 'lecturer-resolved'){
    return (
      <div className="issue-card">
        <div className="card-header">{isssue.title} . {isssue.status} . {isssue.created_at}</div>
        <div className="card-body" style={{fontWeight:"bold", fontSize: "12px"}}>{isssue.category}</div>
        <div className="card-body">{isssue.description}</div>
        <button className="cardbuttons">Re open</button>
      </div>
    );
  }
  };

  export default IssueCard;
  
  