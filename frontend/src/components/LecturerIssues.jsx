import IssueCard from "./IssueCard";

const LecturerIssues = ({issues, type, token, setContent, setid}) => {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      {type === 'lecturer-assigned' ?(
        <>
          {issues.map((issue) => (
            <IssueCard key={issue.id} isssue={issue} type={type} token={token} setContent={setContent} setid={setid}/>
          ))}
        </>
      ) : type === 'lecturer-resolved' ?(
        <>
          {issues.map((issue) => (
            <IssueCard key={issue.id} isssue={issue} type={type} token={token} setContent={setContent} setid={setid}/>
          ))}        
        </>
      ): (
        <></>
      )}

    </div>
  );
};

export default LecturerIssues;