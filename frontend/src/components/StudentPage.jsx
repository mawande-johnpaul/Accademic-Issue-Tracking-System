import { useEffect, useState } from "react";
import axios from "axios";
import ProfileDisplay from "./ProfileDisplay";
import SearchBar from "./SearchBar";
import Button from "./Button";
import DisplayPane from "./DisplayPane";
import Logo from "./Logo";
import Content from "./StudentContentSection";
import InPageLoginButton from "./InPageLoginButton";


/*const MESSAGES = [
  {
    head: 'Messages',
    contents: [
      { name: 'John Doe', message: 'Hello, how are you?' },
      { name: 'Jane Doe', message: 'I am good, thank you.' },
      { name: 'John Doe', message: 'That is good to hear.' },
    ],
  },
  {
    head: 'Notifications',
    contents: [
      { name: 'Jane Doe', message: 'You have a new message.' },
      { name: 'John Doe', message: 'You have a new notification.' },
      { name: 'Jane Doe', message: 'You have a new message.' },
    ],
  },
  {
    head: 'Announcements',
    contents: [
      { name: 'John Doe', message: 'You have a new request.' },
      { name: 'Jane Doe', message: 'You have a new request.' },
      { name: 'John Doe', message: 'You have a new request.' },
    ],
  },
];*/


const StudentPage = () => {
  const [issues, setIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [content, setContent] = useState('Splash');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://127.0.0.1:8000/issues/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setIssues(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://127.0.0.1:8000/notifications/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setNotifications(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchIssues();
      fetchNotifications();
    }
  }, [user]);

  const createnew = () => setContent("IssueForm");
  const otherlist = () => setContent("UserIsues");
  const settings = () => setContent("Settings");
  const no_operation = () => setContent("Splash");  

  return (
    <div className="bodyy">
      <div className="left-side">
        {user ? (
          <div>
            <Logo />
            <Button text={"New issue"} image={"new-issue.svg"} funct={createnew} />
            <Button text={"Posted issues"} image={"posted-logo.svg"} funct={otherlist} />
            <Button text={"Settings"} image={"settings.svg"} funct={settings} />
          </div>
        ) : (
          <div>
            <Logo />
            <Button text={"New issue"} image={"new-issue.svg"} funct={no_operation} />
            <Button text={"Posted issues"} image={"posted-logo.svg"} funct={no_operation} />
            <Button text={"Settings"} image={"settings.svg"} funct={no_operation} />
          </div>
        )}
      </div>
      <div className="content-section">
        <SearchBar />
        <Content to_display_name={content} issues={issues} user={user}/>
      </div>
      {/*<div className="right-side">
        <ProfileDisplay text={user.username}/>
        {<DisplayPane items={notifications[0].contents} type='messages' />
        <DisplayPane items={notifications[1].contents} type='notifications' />
        <DisplayPane items={notifications[2].contents} type='announcements' />
      </div>*/}
    </div>
  );
};

export default StudentPage;
