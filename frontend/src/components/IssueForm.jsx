import { useState } from "react";
import axios from "axios";

const IssueForm = ({ token }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    subject: "",
    category: "",
    courseCode: "",
    year: "",
    semester: "",
    lecturer: "",
    attachments: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachments") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/issues/",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT token for authentication
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Issue submitted successfully!");
      setFormData({
        title: "",
        description: "",
        priority: "Low",
        subject: "",
        category: "",
        courseCode: "",
        year: "",
        semester: "",
        lecturer: "",
        attachments: null,
      }); // Reset form
    } catch (error) {
      setMessage("Failed to submit issue.");
      console.error("Error:", error.response ? error.response.data : error);
    }

    setLoading(false);
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit} className="formcontainer">

      <div className="inputrows">
          <label className="inputlabels">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="inputinputs"
          >
            <option value="">-- Select-Category --</option>
            <option value="course Registration">Course Registration</option>
            <option value="Missing Marks">Missing Marks</option>
            <option value="Timetable Clash">Timetable Clash</option>
            <option value="Lecturer Concern">Lecturer Concern</option>
            <option value="Examination Issue">Examination Issue</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="inputrows">
          <label className="inputlabels">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="inputinputs"
          />
        </div>

        <div className="inputrows">
          <label className="inputlabels">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="inputinputs"
          ></textarea>
        </div>

        <div className="inputrows">
          <label className="inputlabels">Course-Code</label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            required
            placeholder="Enter the Course Code"
            className="inputinputs"
          />
        </div>

        <div className="inputrows">
          <label className="inputlabels">Course-Unit</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Enter the Course-Unit"
            className="inputinputs"
          />
        </div>

        <div className="inputrows">
          <label className="inputlabels">Year Of Study</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            placeholder="Enter Year Of Study"
            className="inputinputs"
          />
        </div>

        <div className="inputrows">
          <label className="inputlabels">Semester</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            placeholder="Enter the Semester"
            className="inputinputs"
          />
        </div>

        <div className="inputrows">
          <label className="inputlabels">Lecturer</label>
            <input
              type="text"
              name="lecturer"
              value={formData.lecturer}
              onChange={handleChange}
              required
              placeholder="Search for lecturer"
              className="inputinputs"
            />
        </div>

        <div className="inputrows">
          <label className="inputlabels">Attachments</label>
          <input
            type="file"
            name="attachments"
            onChange={handleChange}
            className="fileinputinputs"
          />
        </div>

        <div className="inputrows">  
        <button
          type="submit"
          disabled={loading}
          className="formbuttons"
            style={{ backgroundColor: '#080808' , color: "white" }}
        >
          Clear Form
        </button>
        <button
          type="submit"
          disabled={loading}
          className="formbuttons"
            style={{ backgroundColor: "red", color: "white" }}
        >
          Cancel
        </button>
          <button
            type="submit"
            disabled={loading}
            className="formbuttons"
          >
          Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
