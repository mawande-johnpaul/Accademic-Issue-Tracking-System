import { useState, useEffect } from "react";
import axios from "axios";
import Splash from "./Splash";
import Splash2 from "./Splash2";
import Button from "./Button";
import DisplayPane from "./DisplayPane";
import Logo from "./logo";
import Content from "./StudentContentSection";
import { useNavigate, Link } from 'react-router-dom';

const StudentPage = ({content, setContent}) => {
  const [issues, setIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");
  const [id, setid] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await axios.get('http://aitsysten.up.railway.app/issues/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setIssues(response.data);
    };

    const fetchNotifications = async () => {
      const response = await axios.get(`http://aitsysten.up.railway.app/notifications/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setNotifications(response.data);
    };

    if (user) {
      fetchIssues();
      fetchNotifications();
    }
  }, []);

  const no_operation =  () => setContent("Splash");
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
            <Button text={"New issue"} image={"new-issue.svg"} funct={() => setContent("IssueForm")} />
            <Button text={"Posted issues"} image={"posted-logo.svg"} funct={() => setContent("UserIssues")} />
            <Button text={"Logout"} image={"logout.svg"} funct={() => logout()} />
          </div>
          <div className="content-section">
            <Content to_display_name={content} issues={issues} course={user.course} username={user.username} token={token} department={user.department} pk={user.id} type={'user'} content={content} setContent={setContent} role={user.role}/>
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

export default StudentPage;
