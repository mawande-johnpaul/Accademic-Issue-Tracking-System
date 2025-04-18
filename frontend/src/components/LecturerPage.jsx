import { useEffect, useState } from "react";
import axios from "axios";
import ProfileDisplay from "./ProfileDisplay";
import SearchBar from "./SearchBar";
import Button from "./Button";
import DisplayPane from "./DisplayPane";
import Logo from "./Logo"
import Content from './LecturerContentSection'
/*import IssueDisplayForm from "./IssueDisplayForm";
/*import AssignedIssues from "./AssignedIssues";*/


const MESSAGES=[

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
  
]

const LecturerPage = ({content, setContent}) => {
  const [issues, setIssues] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user")); // Moved inside useEffect
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/issues/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setIssues(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIssues();
  }, [user, token]); // Removed user from dependency array

  return (
    <div className="bodyy">
      <div className="left-side">
        <Logo />
        <Button text={"Assigned issues"} image={"new-issue.svg"} funct={() => setContent("AssignedIssues")}/>
        <Button text={"Resolved issues"} image={"posted-logo.svg"} funct={() => setContent("ResolvedIssues")}/>
        <Button text={"Settings"} image={"settings.svg"} funct={() => setContent("Settings")}/>

      </div>
      <div className="content-section">
        <SearchBar />
        <Content to_display_name={content} issues={issues} user={user}/>
      </div>
      <div className="right-side">
        <ProfileDisplay text={"Lecturer"}/>
        <DisplayPane heading={MESSAGES[0].head} items={MESSAGES[0].contents} />
        <DisplayPane heading={MESSAGES[1].head} items={MESSAGES[1].contents} />
      </div>
    </div>
  );
};

export default LecturerPage;