import React, { useEffect } from 'react';
import './css/App.css';
import Button from './components/Button';
import SearchBar from './components/search-bar';
import Logo from './components/logo';
import ProfileDisplay from './components/profile-display';
import DisplayPane from './components/display-pane';

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
        <h1>Hello there!</h1>
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
