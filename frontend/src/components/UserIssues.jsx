import IssueCard from "./IssueCard";

const UserIssues = ({issues}) => {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      {issues.map((issue) => (
        <IssueCard isssue={issue} />
      ))}
    </div>
  );
};

export default UserIssues;
