import IssueForm from "./IssueForm";
import LecturerIssues from "./LecturerIssues";
import Settings from "./Settings";
import Splash from "./Splash";  
import LecturerView from "./LecturerView";

const Content = ({to_display_name, issues, user, token, id, setid, setContent}) => {
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
                    <LecturerIssues issues={issues} type={'lecturer-assigned'} token={token} setContent={setContent} setid={setid}/>
                ) : to_display_name === "ResolvedIssues" && issues ? (
                    <LecturerIssues issues={issues} type={'lecturer-resolved'}  token={token} setContent={setContent} setid={setid}/>
                ) : to_display_name === "LecturerView" && user ? (
                    <LecturerView id={id} token={token} setContent={setContent} issues={issues}/>
                ) : (
                    <Splash />
                )}
            </div>
        </div>
    );
    }

export default Content;