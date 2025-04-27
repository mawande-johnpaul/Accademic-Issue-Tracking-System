import IssueForm from "./IssueForm";
import UserIssues from "./UserIssues";
import Splash2 from "./Splash2";  

const Content = ({to_display_name, issues, course, username, token, department, pk, type, content, setContent, role}) => {
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
                    <UserIssues issues={issues}  type={type} content={content} setContent={setContent}/>
                ) : (
                    <Splash2 role={role} issues={issues}/>
                )}
            </div>
        </div>
    );
    }

export default Content;