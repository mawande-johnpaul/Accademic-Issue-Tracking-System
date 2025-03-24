import React from 'react'; 

const ChatDisplayPane = ({heading, items}) => {
    console.log(items)
    return (
        <div className='display-pane'>
            <div className='pane-header'>{heading}</div>
            <div className='pane-content'>
            {
            items.map((item, i) => (
                <div key={i}>
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