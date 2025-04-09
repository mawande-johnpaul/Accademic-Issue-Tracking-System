import { useState } from "react";
import "./FormStyles.css"; 

const ProgressForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    phone: "",
    email: "",
    total: "",
    resolved: "",
    pending: "",
    overdue: "",
    avgResolutionTime: "",
    studentFeedback: "",
    issueCategory: "",
    challenges: "",
    resources: "",
    suggestions: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      alert("Form submitted successfully!");
      setLoading(false);
    }, 2000);
  };
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){e.preventDefault();
        const formElements = Array.from(e.target.form.elements);
        const index = formElements.indexOf(e.target);
        if (index !== -1 && index < formElements.length - 1){formElements[index + 1].focus();}
    }
};

  const handleCancel = () => {
    setFormData({
      name: "",
      department: "",
      phone: "",
      email: "",
      total: "",
      resolved: "",
      pending: "",
      overdue: "",
      avgResolutionTime: "",
      studentFeedback: "",
      issueCategory: "",
      challenges: "",
      resources: "",
      suggestions: "",
    });
  };

  return (
    <div className="progress-form-container">
      <h2>Progress Form</h2>
      <form onSubmit={handleSubmit} className="progress-form">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} onKeyDown={handleKeyDown} required />

        <label>Department</label>
        <input type="text" name="department" value={formData.department} onChange={handleChange} onKeyDown={handleKeyDown} required />

        <label>Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} onKeyDown={handleKeyDown} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} onKeyDown={handleKeyDown} required />

        <label>Total Issues</label>
        <input type="number" name="total" value={formData.total} onChange={handleChange} onKeyDown={handleKeyDown} required />

        <label>Resolved Issues</label>
        <input type="number" name="resolved" value={formData.resolved} onChange={handleChange} onKeyDown={handleKeyDown} required />

        <label>Pending Issues</label>
        <input type="number" name="pending" value={formData.pending} onChange={handleChange} onKeyDown={handleKeyDown} required />

        <label>Overdue Issues</label>
        <input type="number" name="overdue" value={formData.overdue} onChange={handleChange} onKeyDown={handleKeyDown} required />

        <label>Average Resolution Time</label>
        <input type="text" name="avgResolutionTime" value={formData.avgResolutionTime} onChange={handleChange}onKeyDown={handleKeyDown}  required />

        <label>Student Feedback</label>
        <textarea name="studentFeedback" value={formData.studentFeedback} onChange={handleChange} onKeyDown={handleKeyDown} required />

        <label>Issue Category</label>
        <input type="text" name="issueCategory" value={formData.issueCategory} onChange={handleChange} onKeyDown={handleKeyDown} required />

        <label>Challenges</label>
        <textarea name="challenges" value={formData.challenges} onChange={handleChange} onKeyDown={handleKeyDown} required />

        <label>Resources Needed</label>
        <textarea name="resources" value={formData.resources} onChange={handleChange} onKeyDown={handleKeyDown}required />

        <label>Suggestions</label>
        <textarea name="suggestions" value={formData.suggestions} onChange={handleChange} onKeyDown={handleKeyDown} required />

        <div className="button-container">
          <button type="submit" className='suBmit' disabled={!isFormValid() || loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button type="button" className="cancell" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgressForm;