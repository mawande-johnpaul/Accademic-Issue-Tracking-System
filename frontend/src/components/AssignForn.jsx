import { useState } from "react";
import axios from "axios";

const AssignForm = ({ issueId, token, departments, onAssignmentSuccess }) => {
  const [selectedDept, setSelectedDept] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAssign = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/issues/assign/`,
        {
          issue_id: issueId,
          department: selectedDept,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMsg("Issue successfully assigned!");
      setSelectedDept("");
      if (onAssignmentSuccess) onAssignmentSuccess();
    } catch (error) {
      setErrorMsg("Failed to assign issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAssign} className="assign-form">
      <label htmlFor="department">Assign to Department:</label>
      <select
        id="department"
        value={selectedDept}
        onChange={(e) => setSelectedDept(e.target.value)}
        required
      >
        <option value="" disabled>Select department</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Assigning..." : "Assign"}
      </button>

      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      {successMsg && <p className="success-msg">{successMsg}</p>}
    </form>
  );
};

export default AssignForm;
