import React from 'react';

function displayLoginContent () {
    
}

const ProfileDisplay = ({text}) => {
    return (
        <div className='profile-area'>
            <div className='profile-picture'>
                <img className='profile' src="profile-picture.png" alt="icon" width="20" height="20" />
            </div>
            <div className='profile-name'>
                {text}
            </div>
        </div>
    );
};

export default ProfileDisplay;