// Importing necessary modules from React and React Router
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  // useEffect runs once when the component is mounted
  // It clears any existing user session data from sessionStorage
  useEffect(() => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }, []);

  return (
    <>
      <img src='banner.jpg' alt='Academic Issue Tracking System Banner' className='banner' />
      <div className='homepage'>
        <p><b>📒 ACADEMIC ISSUE TRACKING SYSTEM</b></p>
        <p className='p2'>Log into or create your account to log, track and view academic issues for free.</p>
        <div className='choicearea'>
          <Link to='/login' className='buttons'>Log in</Link>
          <Link to='/signup' className='buttons'>Sign up</Link>
          <Link to='/student' className='buttons'>Guest</Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
