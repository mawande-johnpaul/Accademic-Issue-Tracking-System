import LecturerIssues from "./LecturerIssues";
import Splash2 from "./Splash2";  
import LecturerView from "./LecturerView";
import Notifications from "./Notifications";

// Main content switcher component based on user selection/view
const Content = ({ to_display_name, issues, resolvedIssues, user, token, id, setid, setContent, role, notifications, backend }) => {
  // Map display names to headings
  const headings = {
    AssignedIssues: "Assigned Issues",
    ResolvedIssues: "Resolved Issues",
    LecturerView: "Issue Details",
    Notifications: "Notifications"
  };
  // Set default heading if none is matched
  const heading = headings[to_display_name] || "Dashboard";

  return (
    <div>
      <div className="content-section-header">
        {heading}
      </div>
      <div className="content-section-body" style={{ textAlign: "center" }}>
        {to_display_name === "AssignedIssues" && user ? (
          <LecturerIssues
            issues={issues}
            type="lecturer-assigned"
            token={token}
            setContent={setContent}
            setid={setid}
          />
        ) : to_display_name === "ResolvedIssues" && user ? (
          <LecturerIssues
            issues={resolvedIssues}
            type="lecturer-resolved"
            token={token}
            setContent={setContent}
            setid={setid}
          />
        ) : to_display_name === "LecturerView" && user ? (
          <LecturerView
            issue={id}
            token={token}
            setContent={setContent}
            issues={issues}
            backend={backend}
          />
        ) : to_display_name === "Notifications"? (
          <Notifications items={notifications} />
        ) : (
          <Splash2 role={role} assignedissues={resolvedIssues} newissues={issues} />
        )}
      </div>
    </div>
  );
};

export default Content;
