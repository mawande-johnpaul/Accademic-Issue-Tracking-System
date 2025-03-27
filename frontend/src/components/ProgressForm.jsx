import {useState} from 'react';
import PropTypes from 'prop-types';
import './FormStyles.css';

const ProgressForm = ({ issue = {}, onClose}) => {
    const[progress,setProgress] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Progress Updated for ${issue?.title || 'Unknown Issue' }:`,progress);
        onClose();
    };

    return(
        <div className='modal'>
            <div className='modal-content'>
                <h2>Update Progresss for {issue?.title || 'Unknown Issue'}</h2>
                <form onSubmit = {handleSubmit}>
                    <textarea value={progress} onChange={(e) => setProgress(e.target.value)} placeholder='Enter Progress Update...' required></textarea>
                  <div className='button-container'>  
                    <button type='submit'>Submit</button>
                    <button type='button' onClick={onClose}>Cancel</button>
                </div>
                </form>
            </div>
        </div>
    );
};
ProgressForm.propTypes = {
    issue:PropTypes.shape({
        title:PropTypes.string,
    }),
    onClose:PropTypes.func.isRequired,
};

export default ProgressForm;