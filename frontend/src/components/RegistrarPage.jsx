import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import Logo from "./logo";
import Content from "./RegistrarContentSection";
import Splash from "./Splash";
import { useNavigate } from 'react-router-dom';

const RegistrarPage = ({ content, setContent, backend, isVisible, setIsVisible }) => {
  const [newIssues, setNewIssues] = useState([]);
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [id, setid] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!user || !token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [unseenRes, seenRes, notificationsRes] = await Promise.all([
          axios.get(`${backend}/issues/Unseen/${user.department}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${backend}/issues/Seen/${user.department}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${backend}/notifications/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setNewIssues(unseenRes.data);
        setAssignedIssues(seenRes.data);
        setNotifications(notificationsRes.data);
      } catch (err) {
        setError("Unable to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <Splash />;

  return (
    <div className="bodyy">
      <div className="left-side">
        <Logo setIsVisible={setIsVisible} setContent={setContent}/>
        <Button
          text={"New issues"}
          image={"new-issue.svg"}
          funct={() => setContent("NewIssues")}
          isVisible={isVisible}
        />
        <Button
          text={"Assigned issues"}
          image={"posted-logo.svg"}
          funct={() => setContent("AssignedIssues")}
          isVisible={isVisible}
        />
        <Button
          text={"Notifications"}
          image={"notifications.svg"}
          funct={() => setContent("Notifications")}
          isVisible={isVisible}
        />
        <Button
          text={"Logout"}
          image={"logout.svg"}
          funct={logout}
          isVisible={isVisible}
        />
      </div>
      <div className="content-section">
        {error && <div className="error-message">{error}</div>}
        <Content
          to_display_name={content}
          newissues={newIssues}
          assignedissues={assignedIssues}
          username={user.username}
          token={token}
          department={user.department}
          content={content}
          setContent={setContent}
          id={id}
          setid={setid}
          role={user.role}
          notifications={notifications }
          backend={backend}
        />
      </div>
    </div>
  );
};

export default RegistrarPage;
