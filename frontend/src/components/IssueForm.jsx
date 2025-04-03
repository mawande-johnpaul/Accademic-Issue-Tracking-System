import { useState } from "react";
import axios from "axios";


const IssueForm = ({ cs, token, username, department, pk}) => {

  const COURSES = {
    "BSCS": ["CS101", "CS102", "CS103"],
    "BLIS": ["BL101", "BL102", "BL103"],
    "BIST": ["BI101", "BI102", "BI103"],
    "BSEE": ["BE101", "BE102", "BE103"],
  }

  const ISSUE_CATEGORIES = ['Marks', 'Attendance', 'Resources', 'Environmental', 'Conduct', 'Schedules', 'Other'];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    courseCode: "",
    year: "",
    semester: "",
    attachments: null,
    created_by: pk,
    department: department,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [cse, setCourse] = useState(cs);

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
        category: "",
        courseCode: "",
        year: "",
        semester: "",
        attachments: null,
        created_by: pk,
        department: department
      }); // Reset form
    } catch (error) {
      setMessage("Failed to submit issue.");
      console.error("Error:", error.response ? error.response.data : error);
    }
    
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
            {ISSUE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
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
          <label className="inputlabels">Course-Unit</label>
          <select
            type="text"
            name="subject"
            value={formData.courseCode}
            onChange={handleChange}
            required
            className="inputinputs"
          >
          <option value="">-- Select Course-Unit --</option>
          {
            cse && COURSES[cse].map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))
          }
          </select>
        </div>

        <div className="inputrows">
          <label className="inputlabels">Year Of Study</label>
          <select
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            placeholder="Enter Year Of Study"
            className="inputinputs"
          >
          <option value="">-- Select Year --</option>
          <option value="1">Year 1</option>
          <option value="2">Year 2</option>
          <option value="3">Year 3</option>
          </select>
        </div>

        <div className="inputrows">
          <label className="inputlabels">Semester</label>
          <select
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            placeholder="Enter the Semester"
            className="inputinputs"
          >
          <option value="">-- Select Semester --</option>
          <option value="1">Semester 1</option>
          <option value="2">Recess 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Recess 2</option>
          </select>
        </div>

        <div className="inputrows">
          <label className="inputlabels">Attachments</label>
          <input
            type="file"
            name="attachments"
            onChange={handleChange}
            className="fileinputinputs"
            placeholder="Only Documents and Images are allowed"
            accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, .gif, .pptx, .txt, .ppt"
          />
        </div>

        <div className="inputrows">  
        <button
          type="submit"
          disabled={loading}
          className="formbuttons"
            style={{ backgroundColor: '#080808' , color: "white" }}
          onClick={() => setFormData({
            title: "",
            description: "",
            subject: "",
            category: "",
            courseCode: "",
            year: "",
            semester: "",
            attachments: null,
          })} // Clear form data
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
