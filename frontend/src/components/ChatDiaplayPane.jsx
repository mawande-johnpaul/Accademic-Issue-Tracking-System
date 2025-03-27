import React from 'react'; 

const ChatDisplayPane = ({heading, items}) => {
    return (
        <div className='display-pane'>
            <div className='pane-header'>{heading}</div>
            <div className='pane-content'>
            {
            items.map(item => (
                <div key={item.id}>
                    <div className='message-item'> 
                        <div className='message-header'>{item.name}</div>
                        <div className='message-body'>{item.message}</div>
                    </div>
                    <form>
                        <button>Cancel</button>
                        <button type='submit'>Send</button>
                    </form>
                </div>
            ))
            }
            </div>
        </div>
    )
};

export default ChatDisplayPane;