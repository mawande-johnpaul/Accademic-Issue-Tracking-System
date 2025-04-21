import IssueCard from "./IssueCard";

const RegistrarIssues = ({issues, type, token, content, setContent, setid}) => {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      {type === 'new' ?(
        <>
          {issues.map((issue) => (
            <IssueCard key = {issue.pk} isssue={issue} type={type} token={token} content={content} setContent={setContent} setid={setid}/>
          ))}
        </>
      ) : type === 'assigned' ?(
        <>
          {issues.map((issue) => (
            <IssueCard key = {issue.pk} isssue={issue} type={type} token={token} content={content} setContent={setContent} setid={setid}/>
          ))}        
        </>
      ): (
        <></>
      )}

    </div>
  );
};

export default RegistrarIssues;