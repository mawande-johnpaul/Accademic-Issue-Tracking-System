import { useState } from "react";
import axios from "axios";


const AssignForm = ({ lecturers }) => {

  const [formData, setFormData] = useState({
    assigned_to: pk,
    priority: "Low",
    deadline: "",
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
    setMessage("");

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/issues/assign",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT token for authentication
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Issue submitted successfully!");
      console.log("Response:", response.data);

      setFormData({
        assigned_to: pk,
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
          Assign
          </button>
        </div>
      </form>
      {message && (
        <div className="message" style={{ color: "red", marginTop: "10px" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AssignForm;
