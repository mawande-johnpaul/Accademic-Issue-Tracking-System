import LecturerIssues from "./LecturerIssues";
import Splash2 from "./Splash2";  
import LecturerView from "./LecturerView";

const Content = ({to_display_name, issues, resolvedIssues, user, token, id, setid, setContent, role}) => {
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
                    <LecturerIssues issues={resolvedIssues} type={'lecturer-resolved'}  token={token} setContent={setContent} setid={setid}/>
                ) : to_display_name === "LecturerView" && user ? (
                    <LecturerView issue={id} token={token} setContent={setContent} issues={issues}/>
                ) : (
                    <Splash2 role={role} assignedissues={resolvedIssues} newissues={issues}/>
                )}
            </div>
        </div>
    );
    }

export default Content;