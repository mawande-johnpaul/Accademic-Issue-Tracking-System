//importing necessary modules and dependencies
import { useState } from "react";//managing state
import "./FormStyles.css"; //external css for styling
import PropTypes from "prop-types";//PropTypes for type-checking props
import axios from "axios";//HTTP client for sending requests

//functional component accepting props
const ProgressForm = ({ issue, onClose }) => {
  //state to hold form input values
  const [formData, setFormData] = useState({
    progressTitle:'',
    description:'',
    resolutionDate:'',
    notes:'',
    attachment:'null',// default value for file input
  });

  const [submitted, setSubmitted] = useState(false);//state to track submission status
  const [loading,setLoading] = useState(false);//state to track loading for async request
  const [error, setError] = useState('');//state to store error messages

//handle input and file changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    //update formData state based on input file
    setFormData((prevData) => ({
      ...prevData,
      [name]: type ==='file'? files[0] : value,
    }));
  };
  
// checking for form validity
  const isFormValid = () => {
    return Object.entries(formData).every(([key, field]) => {
      if(key === 'attachment') return true;
      return typeof field === 'string' && field.trim() !== '';
    });
  };
  //function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();// prevent default form behavior
    //show error if form is incomplete
    if(!isFormValid()){
      setError('All fields are required.Please complete the form');
      setTimeout(() => setError(''),4000);// clear error after 4 seconds
      return;
    }
    try{
      setLoading(true);//start loading state
      const token = localStorage.getItem('authToken');//Get auth token from localStorage
      //craete FormData object for submission
      const formPayload = new FormData();
      formPayload.append('issueId', issue.id);
      formPayload.append('progressTitle', formData.progressTitle);
      formPayload.append('description', formData.description);
      formPayload.append('resolutionDate',formData.resolutionDate);
      formPayload.append('notes',formData.notes);
      //Attach file
      if(formData.attachment){
        formPayload.append('attachment',formData.attachment);
      }
      //send POSTR request with progress  data
      await axios.post('http.....',formPayload, {
        headers:{
          'Authorization':`Bearer ${token}`,
          'Content-Type':'multipart/formData'
        },
      });
      setSubmitted(true);//indicate successful submission
      //Reset form and close modal after delay
      setTimeout(() => {
        setFormData({
          progressTitle:'',
          description:'',
          resolutionDate:'',
          notes:'',
          attachment:'',
        });
        setSubmitted(false);
        onClose();// close form
      },2000);
    } catch(error){
      console.error('Error Submitting Progress:',error);//Log error for debugging
      setError('Failed to Submit Progress Please Try Again.');// show error message
      setTimeout(() => setError(''), 4000);// clear error after 4 seconds
    } finally{
      setLoading(false);// end loading State
    }
  }; 
  //for enter button to take you to the next field
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){e.preventDefault();//Prevent form submission on Enter
        const formElements = Array.from(e.target.form.elements);//Get all form//Get index of current Field
        const index = formElements.indexOf(e.target);
        if (index !== -1 && index < formElements.length - 1){formElements[index + 1].focus();//Focus next field}
    }
  }
};
//function that reset form and close it
  const handleCancel = () => {
    setFormData({
      progressTitle:'',
      description:'',
      resolutionDate:'',
      notes:'',
      attachment:null,
    });
    onClose();// trigger close callback
  };
//rendering form UI
  return (
    <div className="progress-form-container">
      <h2>Progress Form for: { issue ?.title}</h2>
      {/* Success message */}
      {submitted && (<div className="submitted">Progress for {issue?.title} submitted successfully!</div>)}
      {/* Error message */}
      {error && (<div className="errorcss">{error}</div>)}
      {/* Form Starts */}
      <form onSubmit={handleSubmit} className="progress-form">
        <label>Progress Title</label>
        <input type="text" name="progressTitle" value={formData.progressTitle} 
        placeholder="e.g. Follow-up on Missing Marks"
        onChange={handleChange} onKeyDown={handleKeyDown}required/>
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
//define prop types for the comment
ProgressForm.propTypes = {
  issue:PropTypes.object.isRequired,//issue object must be passed
   onClose:PropTypes.func.isRequired,//onClose function must be passed
};
//export the component for use in other file
export default ProgressForm;