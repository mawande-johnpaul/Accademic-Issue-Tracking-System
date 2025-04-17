import IssueCard from "./IssueCard";

const LecturerIssues = ({issues, type}) => {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      {type === 'lecturer-assigned' ?(
        <>
          {issues.map((issue) => (
            <IssueCard isssue={issue} type={type}/>
          ))}
        </>
      ) : type === 'lecturer-resolved' ?(
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

export default LecturerIssues;