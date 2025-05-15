import { useState } from "react";
import "./FormStyles.css"; 
import PropTypes from "prop-types";

const ProgressForm = ({ issue, onClose }) => {
  const [formData, setFormData] = useState({
    progressTitle: '',
    description: '',
    resolutionDate: '',
    notes: '',
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // Validate only required fields (exclude attachment and notes)
  const isFormValid = () => {
    const { progressTitle, description, resolutionDate } = formData;
    return (
      progressTitle.trim() !== "" &&
      description.trim() !== "" &&
      resolutionDate.trim() !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please complete all required fields.");
      return;
    }
    alert(`Progress submitted for: ${issue.title}`);
    onClose(); // close form after submit
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const formElements = Array.from(e.target.form.elements);
      const index = formElements.indexOf(e.target);
      if (index !== -1 && index < formElements.length - 1) {
        formElements[index + 1].focus();
      }
    }
  };

  return (
    <div className="progress-form-container">
      <h2>Progress Form for: {issue?.title}</h2>
      <form onSubmit={handleSubmit} className="progress-form">
        <label htmlFor="progressTitle">Progress Title<span style={{color: 'red'}}>*</span></label>
        <input
          id="progressTitle"
          type="text"
          name="progressTitle"
          value={formData.progressTitle}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          required
        />

        <label htmlFor="description">Description<span style={{color: 'red'}}>*</span></label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe Your Progress..."
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="resolutionDate">Expected Resolution Date<span style={{color: 'red'}}>*</span></label>
        <input
          id="resolutionDate"
          type="date"
          name="resolutionDate"
          value={formData.resolutionDate}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          required
        />

        <label htmlFor="notes">Additional Notes/Challenges</label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Any Challenges or notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <label htmlFor="attachment">Attachment (Optional)</label>
        <input
          id="attachment"
          type="file"
          name="attachment"
          onChange={handleChange}
        />

        <div className="button-container">
          <button type="submit" className="submit" disabled={!isFormValid()}>
            Submit
          </button>
          <button type="button" className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

ProgressForm.propTypes = {
  issue: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProgressForm;
