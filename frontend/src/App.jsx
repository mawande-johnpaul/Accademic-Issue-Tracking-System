import React, { useEffect } from 'react';
import './css/App.css';
import Button from './components/Button';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import ProfileDisplay from './components/ProfileDisplay';
import DisplayPane from './components/DisplayPane';
import WelcomePage from './components/WelcomePage'

function App() {
  return (
    <div className='App'>
      <div className='left-side'>
        <SearchBar />
        <Button />
        <Button />
        <Button />
        <Button />
      </div>
      <div className='content-section'>
        <WelcomePage />
      </div>
      <div className='right-side'>
        <ProfileDisplay />
        <DisplayPane />
        <DisplayPane />
        <DisplayPane />
      </div>
    </div>
  );
}

export default App;
