import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import Button from "./components/Button";
import Welcome from "./components/Welcome";
import DisplayPane from "./DisplayPane";

const StudentPage = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        const response = await axios.get('http://127.0.0.1:8000/issues/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setIssues(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="body">
      <div className="left-side">
        <div className="logo">
          AITS
        </div>
        <Button />
        <Button />
        <Button />
      </div>
      <div className="content-section">
        <SearchBar />
        <Welcome />
      </div>
      <div className="right-side">
        <ProfileDisplay />
        <DisplayPane />
      </div>
    </div>
    /*<div>
      <h1>Student Page</h1>
      <ul>
        {Array.isArray(issues) && issues.map(issue => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
    </div>*/
  );
};

export default StudentPage;