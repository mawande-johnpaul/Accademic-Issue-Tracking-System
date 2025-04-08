import axios from "axios";

const IssueCard = ({ isssue, type }) => {
  const assign = async () => {
    const response = axios.patch('http://127.0.0.1:8000/issues/setstatus/Seen', {
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
        <button className="cardbuttons">Reject</button>
        <button className="cardbuttons" onClick={assign}>Assign</button>
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
  };

  export default IssueCard;
  
  