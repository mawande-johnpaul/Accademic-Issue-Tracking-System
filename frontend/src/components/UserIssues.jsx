import IssueCard from "./IssueCard";

const UserIssues = ({ issues = [], type, content, setContent }) => {
  if (!issues.length) {
    return <p className="text-center mt-6">😊 No issues to display.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}  // Fixed prop name here
          type={type}
          content={content}
          setContent={setContent}
        />
      ))}
    </div>
  );
};

export default UserIssues;
