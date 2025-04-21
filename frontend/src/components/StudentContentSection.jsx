import IssueForm from "./IssueForm";
import UserIssues from "./UserIssues";
import Settings from "./Settings";
import Splash from "./Splash";  

const Content = ({to_display_name, issues, course, username, token, department, pk, type, content, setContent}) => {
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
                {to_display_name === "IssueForm" && course ? (
                    <IssueForm cs={course} token={token} username={username} department={department} pk={pk} content={content} setContent={setContent}/>
                ) : to_display_name === "UserIssues" && issues ? (
                    <UserIssues issues={issues}  type={type}/>
                ) : to_display_name === "Settings" && course ? (
                    <Settings user={""} />
                ) : (
                    <Splash />
                )}
            </div>
        </div>
    );
    }

export default Content;