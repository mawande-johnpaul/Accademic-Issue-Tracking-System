import { useState, useEffect } from "react";
import axios from "axios";
import ProfileDisplay from "./ProfileDisplay";
import SearchBar from "./SearchBar";
import Button from "./Button";
import DisplayPane from "./DisplayPane";
import Logo from "./Logo";
import Content from "./RegistrarContentSection";
import InPageLoginButton from "./InPageLoginButton";

const RegistrarPage = () => {

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

  const [newIssues, setNewIssues] = useState([]);
  const [assignedIssues, setAssignedIssues] = useState([])
  const [notifications, setNotifications] = useState([]);
  const [content, setContent] = useState('Splash');


  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await axios.get('http://127.0.0.1:8000/issues/unseen', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setNewIssues(response.data);
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

  const fetchAllIssues = async() => {
    const response = await axios.get('http://127.0.0.1:8000/issues/all/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    setAssignedIssues(response.data);   
  }

  return (
    <div className="bodyy">
        <>
          <div className="left-side">
            {user ? (
              <div>
                <Logo />
                <Button text={"New issues"} image={"new-issue.svg"} funct={() => setContent("NewIssues")} />
                <Button text={"Assigned issues"} image={"posted-logo.svg"} funct={() => setContent("AssignedIssues")} />
                <Button text={"Messages"} image={"posted-logo.svg"} funct={no_operation} />
                <Button text={"Settings"} image={"settings.svg"} funct={no_operation} />
              </div>
            ) : (
              <div>
                <Logo />
                <Button text={"New issues"} image={"new-issue.svg"} funct={no_operation} />
                <Button text={"Assigned issues"} image={"posted-logo.svg"} funct={no_operation} />
                <Button text={"Settings"} image={"settings.svg"} funct={no_operation} />
              </div>
            )}
          </div>
          <div className="content-section">
            <SearchBar />
            <Content to_display_name={content} newissues={newIssues} assignedissues={assignedIssues} username={user.username} token={token} department={user.department}/>
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

export default RegistrarPage;
