import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Button from "./Button";
import DisplayPane from "./DisplayPane";
import Logo from "./Logo";
import Content from "./StudentContentSection";
import InPageLoginButton from "./InPageLoginButton";

const StudentPage = ({content, setContent}) => {

  const MESSAGES = [
    {
      head: 'Notifications',
      contents: [
        {
          name: 'Jane',
          message: 'You have a new message.'
        },
        {
          name: 'John',
          message: 'You have a new notification.'
        },
        {
          name: 'Doe',
          message: 'You have a new message.'
        }
      ]
    },
    {
      head: 'Announcements',
      contents: [
        {
          name: 'John',
          message: 'You have a new request.'
        },
        {
          name: 'Jane',
          message: 'You have a new request.'
        },
        {
          name: 'Doe',
          message: 'You have a new request.'
        }
      ]
    }
  ];

  const [issues, setIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");
  const [id, setid] = useState(0);

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await axios.get('http://127.0.0.1:8000/issues/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setIssues(response.data);
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
                {/*<Button text={"Settings"} image={"settings.svg"} funct={no_operation} />*/}
                {user ? (
                  <Button text={"Profile"} image={"posted-logo.svg"} funct={no_operation} />
                ) : (
                  <InPageLoginButton />
                )}
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
            <Content to_display_name={content} issues={issues} course={user.course} username={user.username} token={token} department={user.department} pk={user.id} type={'user'} content={content} setContent={setContent}/>
          </div>
          <div className="right-side">
            <DisplayPane
              type={"notifications"}
              items={MESSAGES[0].contents}
              user={user} />
            <DisplayPane
              type={"announcements"}
              items={MESSAGES[1].contents}
              user={user} />
          </div>
        </>
      </div>
  );
};

export default StudentPage;
