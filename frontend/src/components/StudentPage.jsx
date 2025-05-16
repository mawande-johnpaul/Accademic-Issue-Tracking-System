import { useState, useEffect } from "react";
import axios from "axios";
import Splash from "./Splash";
import Button from "./Button";
import DisplayPane from "./DisplayPane";
import Logo from "./logo";
import Content from "./StudentContentSection";
import { useNavigate } from 'react-router-dom';

const StudentPage = ({ content, setContent }) => {
  const [issues, setIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loadingIssues, setLoadingIssues] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const userRaw = sessionStorage.getItem("user");
  const user = JSON.parse(userRaw);

  useEffect(() => {
    if (!user || !token) return;

    const fetchIssues = async () => {
      setLoadingIssues(true);
      try {
        const response = await axios.get("https://aitsmak.up.railway.app/issues/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIssues(response.data);
      } catch (err) {
        setError("Failed to fetch issues. Please try again later.");
      } finally {
        setLoadingIssues(false);
      }
    };

    const fetchNotifications = async () => {
      setLoadingNotifications(true);
      try {
        const response = await axios.get(`https://aitsmak.up.railway.app/notifications/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);
      } catch (err) {
        setError("Failed to fetch notifications. Please try again later.");
      } finally {
        setLoadingNotifications(false);
      }
    };

    fetchIssues();
    fetchNotifications();
  }, []);

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return <Splash />;
  }

  return (
    <div className="bodyy">
      <div className="left-side">
        <Logo />
        <Button
          text={"New issue"}
          image={"new-issue.svg"}
          funct={() => setContent("IssueForm")}
        />
        <Button
          text={"Posted issues"}
          image={"posted-logo.svg"}
          funct={() => setContent("UserIssues")}
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
          issues={issues}
          course={user.course}
          username={user.username}
          token={token}
          department={user.department}
          pk={user.id}
          type={"user"}
          content={content}
          setContent={setContent}
          role={user.role}
        />
      </div>
      <div className="right-side">
        <DisplayPane items={notifications} />
      </div>
    </div>
  );
};

export default StudentPage;
