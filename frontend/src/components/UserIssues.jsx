import Card from "./IssueCard";

const UserIssues = ({issues, type}) => {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      {issues.map((issue) => (
        <IssueCard isssue={issue}  type={type}/>
      ))}
    </div>
  );
};

export default UserIssues;
