import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import DisplayPane from "./DisplayPane";
import Logo from "./logo";
import Content from "./RegistrarContentSection";
import Splash from "./Splash";
import { useNavigate } from 'react-router-dom';

const RegistrarPage = ({ content, setContent }) => {
  const [newIssues, setNewIssues] = useState([]);
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [id, setid] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userRaw = sessionStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  useEffect(() => {
    if (!user || !token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [unseenRes, seenRes, notificationsRes] = await Promise.all([
          axios.get("https://aitsmak.up.railway.app/issues/Unseen", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://aitsmak.up.railway.app/issues/Seen", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`https://aitsmak.up.railway.app/notifications/${user.id}`, {
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
  }, [user, token]);

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <Splash />;

  return (
    <div className="bodyy">
      <div className="left-side">
        <Logo />
        <Button
          text={"New issues"}
          image={"new-issue.svg"}
          funct={() => setContent("NewIssues")}
        />
        <Button
          text={"Assigned issues"}
          image={"posted-logo.svg"}
          funct={() => setContent("AssignedIssues")}
        />
        <Button
          text={"Logout"}
          image={"logout.svg"}
          funct={logout}
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
        />
      </div>
      <div className="right-side">
        <DisplayPane items={notifications} />
      </div>
    </div>
  );
};

export default RegistrarPage;
