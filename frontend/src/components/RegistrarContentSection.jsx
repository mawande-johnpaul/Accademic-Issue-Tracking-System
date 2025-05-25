import RegistrarIssues from "./RegistrarIssues";
import Splash2 from "./Splash2"; 
import IssueView from "./IssueView"; 
import Notifications from "./Notifications";

const Content = ({
  to_display_name,
  newissues,
  assignedissues,
  username,
  token,
  setContent,
  id,
  setid,
  role, notifications, backend
}) => {
  // Map display names to headings
  const headings = {
    NewIssues: "New Issues",
    AssignedIssues: "Assigned Issues",
    AssignForm: "Issue Details",
    Notifications: "Notifications"
  };
  const heading = headings[to_display_name] || "Dashboard";

  return (
    <div>
      <div className="content-section-header">
        {heading}
      </div>
      <div className="content-section-body" style={{ textAlign: "center" }}>
        {to_display_name === "NewIssues" ? (
          <RegistrarIssues
            issues={newissues}
            type="new"
            token={token}
            setContent={setContent}
            setid={setid}
            backend={backend}
          />
        ) : to_display_name === "AssignedIssues" ? (
          <RegistrarIssues
            issues={assignedissues}
            type="assigned"
            token={token}
            setContent={setContent}
            setid={setid}
            backend={backend}
          />
        ) : to_display_name === "AssignForm" ? (
          <IssueView
            issue={id}
            token={token}
            setContent={setContent}
            issues={newissues}
            backend={backend}
          />
        ) : to_display_name === "Notifications"? (
          <Notifications items={notifications} />
        ) : (
          <Splash2 role={role} assignedissues={assignedissues} newissues={newissues} />
        )}
      </div>
    </div>
  );
};

export default Content;
