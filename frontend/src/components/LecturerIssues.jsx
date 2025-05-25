import IssueCard from "./IssueCard";

// Component to render a list of issues for a lecturer
const LecturerIssues = ({ issues, type, token, setContent, setid }) => {
  // Return early if type is not valid (ensures only proper views render this)
  if (type !== 'lecturer-assigned' && type !== 'lecturer-resolved') {
    return <p>No issues to display.</p>;
  }

   // Show message if there are no issues to display
  if (!issues || issues.length === 0) {
    return <p>😊 No issues found.</p>;
  }

  return (
    // Container for displaying issue cards
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
