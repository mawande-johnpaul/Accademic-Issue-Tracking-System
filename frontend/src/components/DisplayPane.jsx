import React from 'react';

const DisplayPane = ({items, type}) => {
    return (
        <div className='display-pane'>
            {type === 'notifications'? (
                <div>
                    <div className='pane-header'>Notifications</div>
                    <div className='pane-content'>
                    {
                    items.map(item1 => (
                        <div key={item1.name}>
                            <div className='message-item'> 
                                <div className='message-header'>{item1.name}</div>
                                <div className='message-body'>{item1.message}</div>
                            </div>
                        </div>
                    ))
                    }
                    </div>                    
                </div>
            ) : (
                <div>
                    <div className='pane-header'>Announcements</div>
                    <div className='pane-content'>
                    {
                    items.map(item => (
                        <div key={item.name}>
                            <div className='message-item'> 
                                <div className='message-header'>{item.name}</div>
                                <div className='message-body'>{item.message}</div>
                            </div>
                        </div>
                        
                    ))
                    }
                    </div>                    
                </div>
            )}

        </div>
    )
};

export default DisplayPane;