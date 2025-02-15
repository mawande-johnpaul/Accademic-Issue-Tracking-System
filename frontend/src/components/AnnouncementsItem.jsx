import React from 'react';

function AnnouncementsItem({ heading, messages }) {
  return (
    <div className='display-pane'>
      <div className='pane-header'>
        {heading}
      </div>
      <div className='pane-content'>
        {messages.map((message, index) => (
          <div key={index} className='message-item'>
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementsItem;