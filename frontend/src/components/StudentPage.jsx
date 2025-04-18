import { useState, useEffect } from "react";
import axios from "axios";
import ProfileDisplay from "./ProfileDisplay";
import SearchBar from "./SearchBar";
import Button from "./Button";
import DisplayPane from "./DisplayPane";
import Logo from "./Logo";
import Content from "./StudentContentSection";
import InPageLoginButton from "./InPageLoginButton";

const StudentPage = () => {

  const MESSAGES = [
    {
      head: 'Notifications',
      contents: [
        {
          name: 'Jane Doe',
          message: 'You have a new message.'
        },
        {
          name: 'John Doe',
          message: 'You have a new notification.'
        },
        {
          name: 'Jane Doe',
          message: 'You have a new message.'
        }
      ]
    },
    {
      head: 'Announcements',
      contents: [
        {
          name: 'John Doe',
          message: 'You have a new request.'
        },
        {
          name: 'Jane Doe',
          message: 'You have a new request.'
        },
        {
          name: 'John Doe',
          message: 'You have a new request.'
        }
      ]
    }
  ];

  const [issues, setIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [content, setContent] = useState('Splash');


  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await axios.get('http://127.0.0.1:8000/issues/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setIssues(response.data);
      console.log(user);
    };

    const fetchNotifications = async () => {
      const response = await axios.get('http://127.0.0.1:8000/notifications/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setNotifications(response.data);
    };

    if (user) {
      fetchIssues();
      /*fetchNotifications();*/
    }
  }, [user]);

  const no_operation = () => setContent("Splash");

  return (
    <div className="bodyy">
        <>
          <div className="left-side">
            {user ? (
              <div>
                <Logo />
                <Button text={"New issue"} image={"new-issue.svg"} funct={() => setContent("IssueForm")} />
                <Button text={"Posted issues"} image={"posted-logo.svg"} funct={() => setContent("UserIssues")} />
                <Button text={"Settings"} image={"settings.svg"} funct={no_operation} />
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
            <Content to_display_name={content} issues={issues} course={user.course} username={user.username} token={token} department={user.department} pk={user.id} type={'user'}/>
          </div>
          <div className="right-side">
            {user ? (
              <ProfileDisplay
                name={user.username}
              />
            ) : (
              <InPageLoginButton />
            )}
            <DisplayPane
              type={"notifications"}
              items={MESSAGES[0].contents}
              user={user} />
            <DisplayPane
              type={"announcements"}
              items={MESSAGES[1].contents}
              user={user} />
          </div> {/* Closing the right-side div */}
        </>
      </div> // Closing the main div
  );
};

export default StudentPage;
