import { useState } from "react";
import axios from "axios";


const AssignForm = ({ lecturers, token }) => {

  const [formData, setFormData] = useState({
    assigned_to: pk,
    priority: "Low",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData({ ...formData, [name]: value });
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
      const response = await axios.put(
        "http://127.0.0.1:8000/assign",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT token for authentication
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Issue assigned successfully!");
      console.log("Response:", response.data);

      setFormData({
        assigned_to: pk,
        priority: "Low",
        deadline: "",
      }); // Reset form
    } catch (error) {
      setMessage("Failed to assign issue.");
      console.error("Error:", error.response ? error.response.data : error);
    }
    
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit} className="formcontainer">

        <div className="inputrows">
          <label className="inputlabels">Lecturer</label>
          <select
            type="text"
            name="lecturer"
            value={formData.assigned_to}
            onChange={handleChange}
            required
            placeholder="Select lecturer"
            className="inputinputs"
          >
          <option value="">-- Select Lecturer --</option>
          {
            lecturers.map((lecturer) => {
              <option key={lecturer.pk} value={lecturer.pk}>{lecturer.first}</option>
            })
          }
          <option value="1">Semester 1</option>
          <option value="R1">Recess 1</option>
          <option value="2">Semester 2</option>
          <option value="R2">Recess 2</option>
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
