import { useState } from "react";
import axios from "axios";

const IssueForm = ({ token }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
<<<<<<< Updated upstream
    subject: "",
    category: "",
    courseCode: "",
    year: "",
    semester: "",
    lecturer: "",
    attachments: null,
=======
>>>>>>> Stashed changes
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
<<<<<<< Updated upstream
    const { name, value, files } = e.target;
    if (name === "attachments") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
=======
    setFormData({ ...formData, [e.target.name]: e.target.value });
>>>>>>> Stashed changes
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

<<<<<<< Updated upstream
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
=======
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/issues/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT token for authentication
            "Content-Type": "application/json",
>>>>>>> Stashed changes
          },
        }
      );

      setMessage("Issue submitted successfully!");
<<<<<<< Updated upstream
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
=======
      setFormData({ title: "", description: "", priority: "Low" }); // Reset form
>>>>>>> Stashed changes
    } catch (error) {
      setMessage("Failed to submit issue.");
      console.error("Error:", error.response ? error.response.data : error);
    }

    setLoading(false);
  };

  return (
<<<<<<< Updated upstream
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
=======
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Submit an Issue</h2>
      {message && <p className="mb-3 text-sm text-gray-700">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
>>>>>>> Stashed changes
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
<<<<<<< Updated upstream
            className="inputinputs"
          />
        </div>

        <div className="inputrows">
          <label className="inputlabels">Description</label>
=======
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
>>>>>>> Stashed changes
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
<<<<<<< Updated upstream
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
=======
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
>>>>>>> Stashed changes
      </form>
    </div>
  );
};

<<<<<<< Updated upstream
export default IssueForm;
=======
export default IssueForm;
>>>>>>> Stashed changes
