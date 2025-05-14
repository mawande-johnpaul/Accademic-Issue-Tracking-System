import { useState } from "react";
import "./FormStyles.css"; 
import PropTypes from "prop-types";

const ProgressForm = ({ issue, onClose }) => {
  const [formData, setFormData] = useState({
    progressTitle:'',
    description:'',
    resolutionDate:'',
    notes:'',
    attachment:'null',
  });

//handle input and file changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type ==='file'? files[0] : value,
    }));
  };
  
// checking for form validity
  const isFormValid = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };
//  for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("All fields are required.Please complete the form.");
      return;
    }
    alert(`Progress submitted for: ${issue.title}`);
    onClose();// close form after submit
  };
  //for enter button to take you to the next field
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){e.preventDefault();
        const formElements = Array.from(e.target.form.elements);
        const index = formElements.indexOf(e.target);
        if (index !== -1 && index < formElements.length - 1){formElements[index + 1].focus();}
    }
};

  return (
    <div className="progress-form-container">
      <h2>Progress Form for: { issue ?.title}</h2>
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
          <button type="submit" className='suBmit' disabled={!isFormValid()}>Submit</button>
          <button type="button" className="cancell" onClick={onClose}>
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