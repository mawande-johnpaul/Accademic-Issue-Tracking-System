import IssueForm from "./IssueForm";
import UserIssues from "./UserIssues";
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
                {to_display_name === "IssueForm" && user ? (
                    <IssueForm user={user} />
                ) : to_display_name === "UserIssues" && issues ? (
                    <UserIssues issues={issues} />
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