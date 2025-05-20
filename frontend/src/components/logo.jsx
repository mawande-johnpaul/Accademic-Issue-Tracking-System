import React from 'react';

const Logo = () => {
    return (
        <div className="logo" onClick={() => setIsVisible(prev => !prev)}>
            <img className='logo-profile' src='logo.png' alt='icon' width="20" height="20"/>
            <div>AITS</div>
            <div className='logo-subtext'>Academic Issue Tracking System</div>
            <img className="buttons-dropdown" alt="icon" src="grid.svg"></img>
        </div>
    );
};

export default Logo;