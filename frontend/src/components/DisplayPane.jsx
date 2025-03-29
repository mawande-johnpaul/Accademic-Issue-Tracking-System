import React from 'react';
import ChatDisplayPane from './ChatDisplayPane' 

const DisplayPane = ({items, type}) => {
    return (
        <div className='display-pane'>
            {type === 'notifications'? (
                <div>
                    <div className='pane-header'>Notifications</div>
                    <div className='pane-content'>
                    {
                    items.map(item => (
                        <div key={item.id}>
                            <div className='message-item'> 
                                <div className='message-header'>{item.name}</div>
                                <div className='message-body'>{item.message}</div>
                            </div>
                        </div>
                    ))
                    }
                    </div>                    
                </div>
            ) : type === 'announcements'? (
                <div>
                    <div className='pane-header'>Announcements</div>
                    <div className='pane-content'>
                    {
                    items.map(item => (
                        <div key={item.id}>
                            <div className='message-item'> 
                                <div className='message-header'>{item.name}</div>
                                <div className='message-body'>{item.message}</div>
                            </div>
                        </div>
                    ))
                    }
                    </div>                    
                </div>
            ) : (
                <ChatDisplayPane />
            )}

        </div>
    )
};

export default DisplayPane;