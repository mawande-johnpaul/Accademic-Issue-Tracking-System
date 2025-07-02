import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from "./Button";
import Logo from "./logo";
import Content from './LecturerContentSection';
import Splash from "./Splash";

// Main component for the Lecturer's dashboard/page
const LecturerPage = ({ content, setContent, backend,isVisible, setIsVisible }) => {
  // State hooks for issues, notifications, errors, and the selected issue ID
  const [issues, setIssues] = useState([]);
  const [resolvedIssues, setResolvedIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [id, setid] = useState(0);
  const navigate = useNavigate();

  // Retrieve token and user info from session storage
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));

  // Fetch data after component mounts
  useEffect(() => {
    if (!user || !token) return;  // Stop if not authenticated

    // Fetch assigned issues
    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          `${backend}/issues/${user.id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIssues(response.data);
      } catch {
        setError("Failed to fetch assigned issues.");
      }
    };

     // Fetch resolved issues
    const fetchResolvedIssues = async () => {
      try {
        const response = await axios.get(
          `${backend}/issues/${user.id}/Resolved`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setResolvedIssues(response.data);
      } catch {
        setError("Failed to fetch resolved issues.");
      }
    };

     // Fetch lecturer's notifications
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${backend}/notifications/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotifications(response.data);
      } catch {
        setError("Failed to fetch notifications.");
      }
    };

    // Call all data fetching functions
    fetchNotifications();
    fetchResolvedIssues();
    fetchIssues();
  }, []);

  // Logout function: clears session storage and redirects to login
  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  // Show splash screen if user is not authenticated
  if (!user) return <Splash />;

  return (
    <div className="bodyy">
      <div className="left-side">
        <Logo setIsVisible={setIsVisible} setContent={setContent}/>
        <Button
          text={"Assigned issues"}
          image={"new-issue.svg"}
          funct={() => setContent("AssignedIssues")}
          isVisible={isVisible}
        />
        <Button
          text={"Resolved issues"}
          image={"posted-logo.svg"}
          funct={() => setContent("ResolvedIssues")}
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
          issues={issues}
          resolvedIssues={resolvedIssues}
          user={user}
          token={token}
          id={id}
          setid={setid}
          setContent={setContent}
          role={user.role}
          notifications={notifications }
          backend={backend}
        />
      </div>
    </div>
  );
};

export default LecturerPage;
