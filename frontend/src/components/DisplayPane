import React from 'react';

const DisplayPane = ({items}) => {
    return (
        <div className='display-pane'>
            <div className='pane-header'>
                Notifications
            </div>
            <div className='pane-content'>
            {
            items.map(item1 => (
                <div key={item1.id}>
                    <div className='message-item'> 
                        <div className='message-header'>{item1.sender}</div>
                        <div className='message-body'>{item1.content}</div>
                    </div>
                </div>
            ))
            }
            </div>                   
        </div>
    )
};

export default DisplayPane;