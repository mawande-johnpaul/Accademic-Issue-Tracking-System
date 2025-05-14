import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import Button from "./Button";
import DisplayPane from "./DisplayPane";
import Logo from "./logo"
import Content from './LecturerContentSection'
import Splash2 from "./Splash2";
import Splash from "./Splash";

const LecturerPage = ({content, setContent}) => {
  const [issues, setIssues] = useState([]);
  const [resolvedIssues, setResolvedIssues] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user")); // Moved inside useEffect
  const token = sessionStorage.getItem("token");
  const [id, setid] = useState(0);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/issues/${user.id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setIssues(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchResolvedIssues = async () => {
      try {
        const response = await axios.get(`http://127.0.1:8000/issues/${user.id}/Resolved`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setResolvedIssues(response.data);
      }
      catch (error) {
        console.error(error);
      }
    }
    const fetchNotifications = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/notifications/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setNotifications(response.data);
    };

    if (user){
      fetchNotifications();
      fetchResolvedIssues();
      fetchIssues();
      console.log(notifications)
    }

  }, []); // Removed user from dependency array

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
            <Button text={"Assigned issues"} image={"new-issue.svg"} funct={() => setContent("AssignedIssues")}/>
            <Button text={"Resolved issues"} image={"posted-logo.svg"} funct={() => setContent("ResolvedIssues")}/>
            <Button text={"Logout"} image={"logout.svg"} funct={() => logout()} />
          </div>
          <div className="content-section">
            <Content to_display_name={content} issues={issues} resolvedIssues={resolvedIssues} user={user} token={token} id={id} setid={setid} setContent={setContent}  role={user.role}/>
          </div>
          <div className="right-side">
            <DisplayPane items={notifications} />
          </div>
        </>
      ) : (
        <Splash />
      )}
    </div>
  );
};

export default LecturerPage;