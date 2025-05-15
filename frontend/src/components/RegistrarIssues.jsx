import IssueCard from "./IssueCard";

const RegistrarIssues = ({ issues = [], type, token, content, setContent, setid }) => {
  if (type !== 'new' && type !== 'assigned') {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}  // Fixed typo here
          type={type}
          token={token}
          content={content}
          setContent={setContent}
          setid={setid}
        />
      ))}
    </div>
  );
};

export default RegistrarIssues;
