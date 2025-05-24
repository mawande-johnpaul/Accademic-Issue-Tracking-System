import React from 'react';

const toggleButtons = (setIsVisible) => {
    setIsVisible(prev => !prev)
}

// function to show menu button or not, and toggling views

const Logo = ({setIsVisible, setContent}) => {
    return (
        <div className="logo" >
            <img className='logo-profile' src='logo.png' alt='icon' width="20" height="20" onClick={() => setContent("Splash2")}/>
            <div>AITS</div>
            <div className='logo-subtext'>Academic Issue Tracking System</div>
            <img className="buttons-dropdown" alt="icon" src="grid.svg" onClick={() => toggleButtons(setIsVisible)}></img>
        </div>
    );
};

export default Logo;