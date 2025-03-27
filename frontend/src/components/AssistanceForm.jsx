import { useState } from "react";
import PropTypes from "prop-types";
import './FormStyles.css';

const RequestAssistanceForm = ({ issue = {},onClose}) => {
    const [requestType,setRequestType] = useState('more_info');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Request sent For ${issue?.title || 'Unknown Issue'}:`,requestType,message);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Request Assistance for {issue?.title || 'Uknown Issue'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Request Type:</label>
                    <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
                        <option value='more_info'>Request More Information</option>
                        <oiption value='help'>request Help from Another Lecturer</oiption>
                        <option value='transfer'>Transfer Issue to Another Lecturer</option>
                    </select>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Dewscribe your Request" required></textarea>
                <div className="button-container">
                    <button type='submit'>Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
                </form>
            </div>
        </div>
    );
};
RequestAssistanceForm.propTypes = {
    issue:PropTypes.shape({
        title:PropTypes.string,
    }),
    onClose:PropTypes.func.isRequired,
};

export default RequestAssistanceForm;