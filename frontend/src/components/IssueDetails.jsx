import React from 'react';
import PropTypes from 'prop-types';
import './IssueDetails.css';

const IssueDetails = ({issue,onClose}) => {
    if(!issue) return null;

    return(
        <div className='modal'>
            <div className='modal-content'>
                <h2>Issue Details</h2>
                <p><strong>Title:</strong>{issue.title}</p>
                <p><strong>Status:</strong>{issue.status}</p>
                <p><strong>Description:</strong>{issue.description || 'No description available.'}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

IssueDetails.propTypes = {
    issue:PropTypes.object,
    onClose:PropTypes.func.isRequired,
};

export default IssueDetails;