import IssueForm from "./IssueForm";
import UserIssues from "./UserIssues";
import Splash2 from "./Splash2";
import Notifications from "./Notifications";

const Content = ({
  to_display_name,
  issues = [],
  course,
  username,
  token,
  department,
  pk,
  type,
  content,
  setContent,
  role,
  newissues = [],
  assignedissues = [],
  notifications,
  backend
}) => {
  // Map display names to headings
  const headings = {
    IssueForm: "Create an Issue",
    UserIssues: "Your Issues",
    Notifications: "Notifications"
  };
  const heading = headings[to_display_name] || "Dashboard";

  // Determine what to render
  if (to_display_name === "IssueForm" && course) {
    return (
      <div>
        <div className="content-section-header">
          {heading}
        </div>
        <div className="content-section-body" style={{ textAlign: "center" }}>
          <IssueForm
            cs={course}
            token={token}
            username={username}
            department={department}
            pk={pk}
            content={content}
            setContent={setContent}
            backend={backend}
          />
        </div>
      </div>
    );
  }

  if (to_display_name === "UserIssues") {
    return (
      <div>
        <div className="content-section-header">
          {heading}
        </div>
        <div className="content-section-body" style={{ textAlign: "center" }}>
          <UserIssues issues={issues} type={type} content={content} setContent={setContent} />
        </div>
      </div>
    );
  }

  if (to_display_name === "Notifications") {
    return (
      <div>
        <div className="content-section-header">
          {heading}
        </div>
        <div className="content-section-body" style={{ textAlign: "center" }}>
          <Notifications items={notifications} />
        </div>
      </div>
    );
  }

  // Default: Splash2 view
  return (
    <div>
      <div className="content-section-header">
        {heading}
      </div>
      <div className="content-section-body" style={{ textAlign: "center" }}>
        <Splash2 role={role} issues={issues} newissues={newissues} assignedissues={assignedissues} />
      </div>
    </div>
  );
};

export default Content;
