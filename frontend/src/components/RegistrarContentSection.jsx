import RegistrarIssues from "./RegistrarIssues";
import Settings from "./Settings";
import Splash from "./Splash";  

const Content = ({to_display_name, newissues, assignedissues, username, token, department}) => {
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
                    <RegistrarIssues />
                ) : to_display_name === "AssignedIssues"? (
                    <RegistrarIssues />
                ) : to_display_name === "Settings"? (
                    <Settings user={""} />
                ) : (
                    <Splash />
                )}
            </div>
        </div>
    );
    }

export default Content;