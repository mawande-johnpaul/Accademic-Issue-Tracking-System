import React from 'react';
import RightPaneItem from './RightPaneItem';  

const DisplayPane = ({heading, messages}) => {
    return (
        <div className="display-pane">
            <div className='pane-header'>
                {heading}
            </div>
            <div className='pane-content'>
                {messages.map((message, index) => (
                    <div key={index} className='message'>
                        <RightPaneItem message={message} />
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default DisplayPane;