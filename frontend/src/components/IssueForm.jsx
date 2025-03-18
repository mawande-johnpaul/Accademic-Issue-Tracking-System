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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Submit an Issue</h2>
      {message && <p className="mb-3 text-sm text-gray-700">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Course-Unit</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Enter the Course-Unit"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
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

        <div>
          <label className="block font-medium">Course-Code</label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            required
            placeholder="Enter the Course Code"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Attachments</label>
          <input
            type="file"
            name="attachments"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Year Of Study</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            placeholder="Enter Year Of Study"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Semester</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            placeholder="Enter the Semester"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Lecturer</label>
          <div className="lecturer-container">
            <input
              type="text"
              name="lecturer"
              value={formData.lecturer}
              onChange={handleChange}
              required
              placeholder="Search for lecturer"
              className="w-full p-2 border rounded"
            />
            <span className="search-text">Search</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
};

export default IssueForm;