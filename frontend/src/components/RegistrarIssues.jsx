import Card from "./IssueCard";

const UserIssues = ({issues, type}) => {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      {type === 'new' ?(
        <>
          {issues.map((issue) => (
            <IssueCard isssue={issue} type={type}/>
          ))}
        </>
      ) : type === 'assigned' ?(
        <>
          {issues.map((issue) => (
            <IssueCard isssue={issue} type={type}/>
          ))}        
        </>
      ): (
        <></>
      )}

    </div>
  );
};

export default UserIssues;