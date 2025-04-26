import React from 'react';
import { Link } from 'react-router-dom';
function HomePage() {
    return (
        <>
        <img src='banner.jpg' alt='banner' className='banner'></img>
        <div className='homepage'>
                <p><b>ACADEMIC ISSUE TRACKING SYSTEM</b></p>
                <p className='p2'>Log into or create your account to log, track and view academic issues for free.</p>
                <div className='choicearea'>
                    <Link to='/login' button className='buttons'>Log in</Link>
                    <Link to='/signup' button className='buttons'>Sign up</Link>
                    <Link to='/student' button className='buttons'>Guest</Link>
                </div>
                {alert("welcome")}
        </div>
        </>
    );
}

export default HomePage;