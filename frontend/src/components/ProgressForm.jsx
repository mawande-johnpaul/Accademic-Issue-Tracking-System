import { useState } from "react";
import "./FormStyles.css"; 
import PropTypes from "prop-types";
import axios from "axios";

const ProgressForm = ({ issue, onClose }) => {
  const [formData, setFormData] = useState({
    progressTitle:'',
    description:'',
    resolutionDate:'',
    notes:'',
    attachment:'null',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState('');

//handle input and file changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type ==='file'? files[0] : value,
    }));
  };
  
// checking for form validity
  /*const isFormValid = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };*/
  const isFormValid = () => {
    return Object.entries(formData).every(([key, field]) => {
      if(key === 'attachment') return true;
      return typeof field === 'string' && field.trim() !== '';
    });
  };
//  for form submission
 /* const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("All fields are required.Please complete the form.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        progressTitle:'',
        description:'',
        resolutionDate:'',
        notes:'',
        attachment:'',
      });
      setSubmitted(false);
      onClose();
    },2000);
  };*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isFormValid()){
      setError('All fields are required.Please complete the form');
      setTimeout(() => setError(''),4000);
      return;
    }
    try{
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const formPayload = new FormData();
      formPayload.append('issueId', issue.id);
      formPayload.append('progressTitle', formData.progressTitle);
      formPayload.append('description', formData.description);
      formPayload.append('resolutionDate',formData.resolutionDate);
      formPayload.append('notes',formData.notes);
      if(formData.attachment){
        formPayload.append('attachment',formData.attachment);
      }
      await axios.post('http.....',formPayload, {
        headers:{
          'Authorization':`Bearer ${token}`,
          'Content-Type':'multipart/formData'
        },
      });
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          progressTitle:'',
          description:'',
          resolutionDate:'',
          notes:'',
          attachment:'',
        });
        setSubmitted(false);
        onClose();
      },2000);
    } catch(error){
      console.error('Error Submitting Progress:',error);
      setError('Failed to Submit Progress Please Try Again.');
      setTimeout(() => setError(''), 4000);
    } finally{
      setLoading(false);
    }
  }; 
  //for enter button to take you to the next field
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){e.preventDefault();
        const formElements = Array.from(e.target.form.elements);
        const index = formElements.indexOf(e.target);
        if (index !== -1 && index < formElements.length - 1){formElements[index + 1].focus();}
    }
};
  const handleCancel = () => {
    setFormData({
      progressTitle:'',
      description:'',
      resolutionDate:'',
      notes:'',
      attachment:null,
    });
    onClose();
  };

  return (
    <div className="progress-form-container">
      <h2>Progress Form for: { issue ?.title}</h2>
      {submitted && (<div className="submitted">Progress for {issue?.title} submitted successfully!</div>)}
      {error && (<div className="errorcss">{error}</div>)}
      <form onSubmit={handleSubmit} className="progress-form">
        <label>Progress Title</label>
        <input type="tetx" name="progressTitle" value={formData.progressTitle} onChange={handleChange} onKeyDown={handleKeyDown}required/>
        <label>Description</label>
        <textarea name="description" placeholder="Describe Your Progress..." value={formData.description} onChange={handleChange} required></textarea>
        <label>Expected Resolution Date</label>
        <input type="date" name="resolutionDate" value={formData.resolutionDate} onChange={handleChange} onKeyDown={handleKeyDown}/>
        <label>Additional Notes/Challenges</label>
        <textarea name="notes" placeholder="Any Challenges or notes" value={formData.notes} onChange={handleChange}></textarea>
        <label>Attachment(Optional)</label>
        <input  type="file" name="attachment" onChange={handleChange}/>
        <div className="button-container">
          <button type="submit" className='suBmit' disabled={!isFormValid() || loading}>{loading ? 'Submitting...':'Submit'}</button>
          <button type="button" className="cancell" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
ProgressForm.propTypes = {
  issue:PropTypes.object.isRequired, onClose:PropTypes.func.isRequired,
};

export default ProgressForm;