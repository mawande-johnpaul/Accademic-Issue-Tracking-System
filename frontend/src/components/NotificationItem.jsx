import React from 'react';

function NotificationItem({ heading, messages }) {
  return (
    <div className='display-pane'>
      <div className='pane-header'>
        {heading}
      </div>
      <div className='pane-content'>
        {messages.map((message, index) => (
          <div key={index} className='message-item'>
            {message.sender}: {message.message_content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationItem;