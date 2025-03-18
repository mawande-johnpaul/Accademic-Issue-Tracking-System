import { useEffect, useState } from "react";
import axios from "axios";
import ProfileDisplay from "./ProfileDisplay";
import SearchBar from "./SearchBar";
import Button from "./Button";
import DisplayPane from "./DisplayPane";
import Logo from "./Logo"
/*import IssueForm from "./IssueForm";*/
import UserIssues from "./UserIssues";


const MESSAGES=[
  {
      head: 'Messages',
      contents: [
          {
              name: 'John Doe',
              message: 'Hello, how are you?'
          },
          {
              name: 'Jane Doe',
              message: 'I am good, thank you.'
          },
          {
              name: 'John Doe',
              message: 'That is good to hear.'
          }
      ]
  },
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

const StudentPage = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem("token");

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
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const Welcome = () => {
    return (
        <div className="form-holder">
          <div className="content-section-header">
          Hello {user.username}!
          </div>
          <div className="content-section-body">
            <UserIssues /> 
          </div>
        </div>
    );
};

function createnew(){
  console.log("New Issue created");
};

function otherlist(){
  console.log("Others selected");
}

function settings(){
  console.log("Settings selected");
}

  return (
    <div className="bodyy">
      <div className="left-side">
        <Logo />
        <Button text={"New issue"} image={"new-issue.svg"} funct={createnew}/>
        <Button text={"Posted issues"} image={"posted-logo.svg"} funct={otherlist}/>
        <Button text={"Settings"} image={"settings.svg"} funct={settings}/>

      </div>
      <div className="content-section">
        <SearchBar />
        <Welcome />
      </div>
      <div className="right-side">
        <ProfileDisplay text={user.username}/>
        <DisplayPane heading={MESSAGES[0].head} items={MESSAGES[0].contents} />
        <DisplayPane heading={MESSAGES[1].head} items={MESSAGES[1].contents} />
        <DisplayPane heading={MESSAGES[2].head} items={MESSAGES[2].contents} />
      </div>
    </div>
  );
};

export default StudentPage;