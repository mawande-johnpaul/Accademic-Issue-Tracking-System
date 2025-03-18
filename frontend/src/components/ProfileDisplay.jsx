import React from 'react';

function displayLoginContent () {
    
}

const ProfileDisplay = ({text}) => {
    return (
        <div className='profile-area' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className='profile-picture'>
                <img className='profile' src="profile-picture.png" alt="icon" width="20" height="20" />
            </div>
            <div className='profile-name' style={{ flexGrow: 1 }}>
                {text}
            </div>
            <button className='buttons' style={{ padding: '10px 10px', cursor: 'pointer' , fontFamily:"Inter", backgroundColor:"#00D988", fontWeight:"bold"}}>Logout</button>
        </div>
    );
};

export default ProfileDisplay;