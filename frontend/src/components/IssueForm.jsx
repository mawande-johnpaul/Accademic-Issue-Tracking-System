import { useState } from "react";
import axios from "axios";

const IssueForm = ({ token }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/issues/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT token for authentication
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Issue submitted successfully!");
      setFormData({ title: "", description: "", priority: "Low" }); // Reset form
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
      </form>
    </div>
  );
};

export default IssueForm;
