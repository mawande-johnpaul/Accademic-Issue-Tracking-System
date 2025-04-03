const IssueCard = ({ isssue }) => {
    return (
      <div className="issue-card">
        <div className="card-header">{isssue.title} . {isssue.status} . {isssue.created_at}</div>
        <div className="card-body" style={{fontWeight:"bold", fontSize: "12px"}}>{isssue.category}</div>
        <div className="card-body">{isssue.description}</div>
      </div>
    );
  };
  
  export default IssueCard;