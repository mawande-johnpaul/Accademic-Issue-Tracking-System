import React from 'react'; 

const DisplayPane = ({heading, items, type}) => {
    return (
        <div className='display-pane'>
            {type === 'notifications'? (
                <div>
                    <div className='pane-header'>{heading}</div>
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
                <div>Announcements</div>
            ) : (
                <div>Messages</div>
            )}

        </div>
    )
};

export default DisplayPane;