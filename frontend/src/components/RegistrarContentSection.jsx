import RegistrarIssues from "./RegistrarIssues";
import Settings from "./Settings";
import Splash from "./Splash"; 
import AssignForm from "./AssignForm"; 

const Content = ({to_display_name, newissues, assignedissues, username, lecturers, token}) => {
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
                {to_display_name === "NewIssues"? (
                    <RegistrarIssues issues={newissues} type={'new'} token={token}/>
                ) : to_display_name === "AssignedIssues"? (
                    <RegistrarIssues issues={assignedissues} type={'assigned'} token={token}/>
                ) : to_display_name === "Settings"? (
                    <Settings user={""} />
                ) : to_display_name === "AssignForm"? (
                    <AssignForm lecturers={lecturers}  token={token}/>
                ) : (
                    <Splash />
                )}
            </div>
        </div>
    );
    }

export default Content;