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
  role, notifications, backend, lecturers
}) => {
  return (
    <div>
      <div className="content-section-header">
        {username ? (
          <div>Welcome {username}!</div>
        ) : (
          <div>Welcome Guest! Login or Signup to view and submit issues.</div>
        )}
      </div>
      <div className="content-section-body" style={{ textAlign: "center" }}>
        {to_display_name === "NewIssues" ? (
          <RegistrarIssues
            issues={newissues}
            type="new"
            token={token}
            setContent={setContent}
            setid={setid}
          />
        ) : to_display_name === "AssignedIssues" ? (
          <RegistrarIssues
            issues={assignedissues}
            type="assigned"
            token={token}
            setContent={setContent}
            setid={setid}
          />
        ) : to_display_name === "AssignForm" ? (
          <IssueView
            issue={id}
            token={token}
            setContent={setContent}
            issues={newissues}
            backend={backend}
            lecturers={lecturers}
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
