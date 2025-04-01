import React from 'react';

const Logo = () => {
    return (
        <div className="logo">
            <img className='logo-profile' src='logo.png' alt='icon' width="20" height="20"/>
            <div>AITS</div>
            <div className='logo-subtext'>Academic Issue Tracking System</div>
        </div>
    );
};

export default Logo;