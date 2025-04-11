import React from 'react';

function displayLoginContent () {
    
}

const ProfileDisplay = ({name}) => {
    return (
        <div className='profile-area' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div className='profile-picture'>
                <img className='profile' src="profile-picture.png" alt="icon" width="18" height="18" />
            </div>
            <div className='profile-name' style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: "Inter", color: "#080808", textWrap: 'wrap', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {name}
            </div>
            <button className='buttons' style={{ fontSize: '10px', padding: '5px 10px', cursor: 'pointer' , fontFamily:"Inter", backgroundColor:"#00D988", fontWeight:"bold"}}>Logout</button>
        </div>
    );
};

export default ProfileDisplay;