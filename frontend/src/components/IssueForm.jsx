import { useState } from "react";
import axios from "axios";

const IssueForm = ({ cs, token, department, pk, content, setContent, backend }) => {
  const COURSES = {
    BSCS: ["CS101", "CS102", "CS103"],
    BLIS: ["BL101", "BL102", "BL103"],
    BIST: ["BI101", "BI102", "BI103"],
    BSEE: ["BE101", "BE102", "BE103"],
    BSCOMM: ["BC101", "BC102", "BC103"],
  };

  const ISSUE_CATEGORIES = [
    "Marks",
    "Attendance",
    "Resources",
    "Environmental",
    "Conduct",
    "Schedules",
    "Other",
  ];

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
      setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
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
    setMessage("");
  };

  // Cancel handler: you can adjust this to navigate where needed
  const handleCancel = () => {
    setContent("UserIssues");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== "") {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        `${backend}/issues/`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response){
      setContent("UserIssues");
      resetForm();}
    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
          "Failed to submit issue. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="formcontainer">
        <div className="inputrows">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="inputinputs"
          >
            <option value="">-- Select Category --</option>
            {ISSUE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="inputrows">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="inputinputs"
            placeholder="Title"
          />
        </div>

        <div className="inputrows">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="inputinputs"
            placeholder="Description"
          />
        </div>

    <div className="inputrows">
      <select
        name="courseCode"
        value={formData.courseCode}
        onChange={handleChange}
        className="inputinputs"
        disabled={!["Marks", "Attendance", "Resources", "Other"].includes(formData.category)}
      >
        <option value="">-- Select Course Unit --</option>
        {cse &&
          COURSES[cse]?.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
      </select>
    </div>


        <div className="inputrows">
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="inputinputs"
          >
            <option value="">-- Select Year --</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
          </select>
        </div>

        <div className="inputrows">
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            className="inputinputs"
          >
            <option value="">-- Select Semester --</option>
            <option value="1">Semester 1</option>
            <option value="R1">Recess 1</option>
            <option value="2">Semester 2</option>
            <option value="R2">Recess 2</option>
          </select>
        </div>

        <div className="inputrows">
          <input
            type="file"
            name="attachments"
            onChange={handleChange}
            className="fileinputinputs"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.pptx,.txt,.ppt"
          />
        </div>

        <div className="choicearea">
          <button
            type="button"
            disabled={loading}
            className="formbuttons"
            style={{ backgroundColor: "#080808", color: "white" }}
            onClick={resetForm}
          >
            Clear Form
          </button>
          <button
            type="button"
            disabled={loading}
            className="formbuttons"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="formbuttons"
            style={{ backgroundColor: "#007bff", color: "white" }}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {message && (
        <div className="message" style={{ color: "red", marginTop: 10 }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default IssueForm;
