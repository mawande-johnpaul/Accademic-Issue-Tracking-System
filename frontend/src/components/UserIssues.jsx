import { useState, useEffect } from "react";
import axios from "axios";
import IssueCard from "./IssueCard";

const UserIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssues = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Unauthorized: No token found.");
          return;
        }
        console.log("Using token:", token); // Debugging


        const response = await axios.get("http://127.0.0.1:8000/issues/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Response:", response.data); // Debugging
        

        setIssues(response.data);
      }

    fetchIssues();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {issues.map((issue) => (
        <IssueCard isssue={issue} />
      ))}
    </div>
  );
};

export default UserIssues;
