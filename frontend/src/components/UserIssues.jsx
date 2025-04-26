import IssueCard from "./IssueCard";

const UserIssues = ({issues, type, content, setContent}) => {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      {issues.map((issue) => (
        <IssueCard isssue={issue}  type={type} content={content} setContent={setContent}/>
      ))}
    </div>
  );
};

export default UserIssues;
