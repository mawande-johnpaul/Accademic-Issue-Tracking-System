import IssueCard from "./IssueCard";

const RegistrarIssues = ({issues, type, token}) => {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      {type === 'new' ?(
        <>
          {issues.map((issue) => (
            <IssueCard key = {issue.pk} isssue={issue} type={type} token={token}/>
          ))}
        </>
      ) : type === 'assigned' ?(
        <>
          {issues.map((issue) => (
            <IssueCard key = {issue.pk} isssue={issue} type={type} token={token}/>
          ))}        
        </>
      ): (
        <></>
      )}

    </div>
  );
};

export default RegistrarIssues;