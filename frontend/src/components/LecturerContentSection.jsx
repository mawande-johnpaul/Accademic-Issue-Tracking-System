import IssueForm from "./IssueForm";
import LecturerIssues from "./LecturerIssues";
import Settings from "./Settings";
import Splash from "./Splash";  

const Content = ({to_display_name, issues, user}) => {
    return (
        <div>
            <div className="content-section-header">
                {user ? (
                    <div>Welcome {user.username}!</div>
                ) : (
                    <div>Welcome Guest! Login or Signup to view and submit issues.</div>
                )}
            </div>
            <div className="content-section-body" style={{ textAlign: "center" }}>
                {to_display_name === "AssignedIssues" && user ? (
                    <LecturerIssues issues={issues} type={'lecturer-assigned'} />
                ) : to_display_name === "Resolved Issues" && issues ? (
                    <LecturerIssues issues={issues} type={'lecturer-resolved'}  />
                ) : to_display_name === "Settings" && user ? (
                    <Settings user={user} />
                ) : (
                    <Splash />
                )}
            </div>
        </div>
    );
    }

export default Content;