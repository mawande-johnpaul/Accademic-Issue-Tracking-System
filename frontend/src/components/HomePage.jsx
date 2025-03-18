import React from 'react';
import { Link } from 'react-router-dom';
function HomePage() {
    return (
        <div className='homepage'>
            <h1 className='h1'>Welcome to AITS</h1>
            <div className='welcometext'>
                <p><b>Academic Issue Tracking System</b></p>
                <p>Log into or create your account to log, track and view academic issues for free.</p>
                
            </div>
            <div className='lower'>
                <Link to='/login' button className='buttons'>Log in</Link>
                <Link to='/signup' button className='buttons'>Sign up</Link>
            </div>

        </div>
    );
}

export default HomePage;