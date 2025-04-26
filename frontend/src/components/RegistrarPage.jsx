import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import DisplayPane from "./DisplayPane";
import Logo from "./Logo";
import Content from "./RegistrarContentSection";
import InPageLoginButton from "./InPageLoginButton";

const RegistrarPage = ({content, setContent}) => {

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

  const [newIssues, setNewIssues] = useState([]);
  const [assignedIssues, setAssignedIssues] = useState([])
  const [notifications, setNotifications] = useState([]);
  const [id, setid] = useState(0);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await axios.get('http://127.0.0.1:8000/issues/Unseen', {
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

    const fetchAllIssues = async() => {
      const response = await axios.get('http://127.0.0.1:8000/issues/Seen', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setAssignedIssues(response.data);   
    }
  
    if (user) {
      fetchIssues();
      fetchAllIssues();
      //fetchNotifications();
    }
  }, [user, token]);
  

  const no_operation = () => setContent("Splash");

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
                {user ? (
                  <Button text={"Profile"} image={"posted-logo.svg"} funct={no_operation} />
                ) : (
                  <InPageLoginButton />
                )}
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
            <Content to_display_name={content} newissues={newIssues} assignedissues={assignedIssues} username={user.username} token={token} department={user.department} content={content} setContent={setContent} id={id} setid={setid}/>
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
          </div> {/* Closing the right-side div */}
        </>
      </div> // Closing the main div
  );
};

export default RegistrarPage;
