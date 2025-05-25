import IssueCard from "./IssueCard";

const LecturerIssues = ({ issues, type, token, setContent, setid }) => {
  if (type !== 'lecturer-assigned' && type !== 'lecturer-resolved') {
    return <p>No issues to display.</p>;
  }

  if (!issues || issues.length === 0) {
    return <p>😊 No issues found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}        // Fixed typo here
          type={type}
          token={token}
          setContent={setContent}
          setid={setid}
        />
      ))}
    </div>
  );
};

export default LecturerIssues;
