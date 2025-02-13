import React from 'react';

const DisplayPane = ({ content }) => {
    return (
        <div>
            <h1>{content.heading}</h1>
            <p>{content.body}</p>
        </div>
    );
};

export default DisplayPane;