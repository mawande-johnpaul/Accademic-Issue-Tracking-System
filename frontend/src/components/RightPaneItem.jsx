import React from 'react';

function RightPaneItem({ heading, items }) {
  return (
    <div className='display-pane'>
      <div className='pane-header'>
        {heading}
      </div>
      <div className='pane-content'>
        {items.map((item, index) => (
          <div key={index} className='message-item'>
            <div className='sender'>{item.sender}</div>
            <div className='message-content'>{item.message_content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RightPaneItem;