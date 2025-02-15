import React, { useEffect } from 'react';
import './css/App.css';
import Button from './components/Button';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import ProfileDisplay from './components/ProfileDisplay';
import MessageItem from './components/RightPaneItem';
import NotificationItem from './components/NotificationItem';
import AnnouncementsItem from './components/AnnouncementsItem';
import WelcomePage from './components/WelcomePage';
import RightPaneItem from './components/RightPaneItem';

function newIssue() {
  console.log("New Issue Button Clicked");
}

function loggedIssues() {
  console.log("Logged issues Button Clicked");
}

function otherIssues() {
  console.log("Other issues Button Clicked");
}

function settings() {
  console.log("Settings Button Clicked");
}

const buttons = [
  { text: "New Issue", image: "/new-issue.svg", func: newIssue },
  { text: "Logged Issues", image: "/posted-logo.svg", func: loggedIssues },
  { text: "Other Issues", image: "/others-logo.svg", func: otherIssues },
  { text: "Settings", image: "/new-issue.svg", func: settings },
];

const messages = [
  { sender: "Sender 1", message_content: "Message from sender 1" },
  { sender: "Sender 2", message_content: "Message from sender 2" },
  { sender: "Sender 3", message_content: "Message from sender 3" }  
];
const notifications = [
  { sender: "Sender 1", message_content: "Notification from sender 1" },
  { sender: "Sender 2", message_content: "Notification from sender 2" },
  { sender: "Sender 3", message_content: "Notification from sender 3" }
];
const announcements = [
  { sender: "Sender 1", message_content: "Announcement from sender 1" },
  { sender: "Sender 2", message_content: "Announcement from sender 2" },
  { sender: "Sender 3", message_content: "Announcement from sender 3" }
];

function App() {
  return (
    <div className='App'>
      <div className='left-side'>
        <Logo />
        {buttons.map((button, index) => (
          <Button key={index} text={button.text} image={button.image} funct={button.func} />
        ))}
      </div>
      <div className='content-section'>
        <SearchBar />
        <WelcomePage />
      </div>
      <div className='right-side'>
        <ProfileDisplay />
        <RightPaneItem heading="Messages" items={messages} />
        <RightPaneItem heading="Notifications" items={notifications} />
        <RightPaneItem heading="Announcements" items={announcements} />
      </div>
    </div>
  );
}

export default App;
