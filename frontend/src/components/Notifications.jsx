import React from 'react';
import PropTypes from 'prop-types';

const Notifications = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className='display-pane'>
        <div className='pane-header'>Notifications</div>
        <div className='pane-content'>
          <p>No notifications available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='display-pane'>
      <div className='pane-content'>
        {items.map(({ id, sender, content }) => (
          <div key={id} className='message-item'>
            <div className='message-header'>{sender}</div>
            <div className='message-body'>{content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

Notifications.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      sender: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default Notifications;