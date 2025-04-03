const IssueCard = ({ isssue, type }) => {
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
        <div className="card-header">{isssue.title} . {isssue.status} . {isssue.created_at}</div>
        <div className="card-body" style={{fontWeight:"bold", fontSize: "12px"}}>{isssue.category}</div>
        <div className="card-body">{isssue.description}</div>
        <button className="buttons">Reject</button>
        <button className="buttons">Assign</button>
      </div>
    );
  }

  if (type === 'assigned'){
    return (
      <div className="issue-card">
        <div className="card-header">{isssue.title} . {isssue.status} . {isssue.created_at}</div>
        <div className="card-body" style={{fontWeight:"bold", fontSize: "12px"}}>{isssue.category}</div>
        <div className="card-body">{isssue.description}</div>
        <button className="buttons">Remove</button>
        <button className="buttons">Reallocate</button>
        <button className="buttons">Request Report</button>
      </div>
    );
  }
  };

  export default IssueCard;
  
  