import React from 'react';

function displayLoginContent () {
    
}

const ProfileDisplay = () => {
    return (
        <div className='profile-area'>
            <button className="login-button" onClick={displayLoginContent}>
                Login / Signup
            </button>
        </div>
    );
};

export default ProfileDisplay;