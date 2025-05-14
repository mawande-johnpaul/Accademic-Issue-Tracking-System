import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import DisplayPane from "./DisplayPane";
import Logo from "./logo";
import Content from "./RegistrarContentSection";
import { useNavigate, Link } from 'react-router-dom';
import Splash from "./Splash";
import Splash2 from "./Splash2";

const RegistrarPage = ({content, setContent}) => {

  const [newIssues, setNewIssues] = useState([]);
  const [assignedIssues, setAssignedIssues] = useState([])
  const [notifications, setNotifications] = useState([]);
  const [id, setid] = useState(0);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await axios.get('http://aitsmak.up.railway.app/issues/Unseen', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });  
      setNewIssues(response.data);
    };

    const fetchNotifications = async () => {
      const response = await axios.get(`http://aitsmak.up.railway.app/notifications/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setNotifications(response.data);
    };

    const fetchAllIssues = async() => {
      const response = await axios.get('http://aitsmak.up.railway.app/issues/Seen', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setAssignedIssues(response.data);   
    }
  
    if (user) {
      fetchIssues();
      fetchAllIssues();
      fetchNotifications();
    }
  }, []);
  

  const no_operation = () => setContent("Splash");
  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token'); 
    navigate("/login");  
  }

  return (
    <div className="bodyy">
        {user? (
          <>
          <div className="left-side">
          <Logo />
          <Button text={"New issues"} image={"new-issue.svg"} funct={() => setContent("NewIssues")} />
          <Button text={"Assigned issues"} image={"posted-logo.svg"} funct={() => setContent("AssignedIssues")} />
          <Button text={"Logout"} image={"logout.svg"} funct={() => logout()} />
        </div>
        <div className="content-section">
          <Content to_display_name={content} newissues={newIssues} assignedissues={assignedIssues} username={user.username} token={token} department={user.department} content={content} setContent={setContent} id={id} setid={setid} role={user.role}/>
        </div>
        <div className="right-side">
            <DisplayPane items={notifications} />
        </div>
        </>
        ) : (
          <>
          <Splash />
          </>
        )}
    </div> // Closing the main div
  );
};

export default RegistrarPage;
