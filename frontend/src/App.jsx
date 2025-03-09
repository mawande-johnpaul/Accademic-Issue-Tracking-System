import React, { useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import SearchBar from './components/search-bar';
import Logo from './components/logo';
import ProfileDisplay from './components/profile-display';
import DisplayPane from './components/display-pane';
import issueform from './componets/issueform';

function App() {
  useEffect(() => {
    console.log('App component mounted');
    
    return () => {
      console.log('App component unmounted');
    };
  }, []);

  return (
    <div className='App'>
      <div className='left-side'>
        <Logo />
        <SearchBar />
        <Button button_details={{text: 'New Issue'}} />
        <Button button_details={{text: 'Logged Issues'}} />
        <Button button_details={{text: 'Other Issues'}} />
        <Button button_details={{text: 'Settings'}} />
        <issueform/>
      </div>
      <div className='content-section'>
        {/* Content goes here */}
      </div>
      <div className='right-side'>
        <ProfileDisplay />
        <DisplayPane content={{heading: 'Messages', body: {messages}}}/>
        <DisplayPane content={{heading: 'Notifications', body: {notifications}}} />
        <DisplayPane content={{heading: 'Announcements', body: {announcements}}} />
      </div>
    </div>
  );
}

export default App;
