import React, { useState } from 'react';
import '../App.css';

function issueForm(){
    const [formData, setFormData] = useState({title:'',studentID:'',regNumber:'',
        name:'',subject:'',description:'',category:'Assignment',courseCode:'',course:'',
        attachments:null,year:'',semester:'',lecturer:'' });
    const [lecturerResults, setLecturerResults] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value, type,files } = e.target;
        setFormData((prev) => ({...prev,[name]: type === 'file' ? files[0]: value}));
        validateform();
    };

    const handleLecturerSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setLecturerResults(searchTerm.length>2 ? lecturerResults.filter(lecturer => lecturer.toLowerCase().includes(searchTerm)): []);
    };

    const handleLecturerSelect = (lecturer) => {
        setFormData((prev) => ({...prev,Lecturer }));
        setLecturerResults([]);
    };
    const validateForm = () => {
        setIsFormValid(Object.values(formDta).every(value => value !=='' && value !== null));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) alert('Form Submitted');
    };
    return (
        <div className="container">
            <h1>Submit An Academic Issue</h1>
            <form onSubmit={handleSubmit}>
                <label>Issue Title</label>
                <input type='text' name='title' value={formData.title} onChange={handleChange} required/>
                <label>Student ID</label>
                <input type='text' name='studentID' value={formData.studentID} onChange={handleChange} required/>
                <label>Reg Number</label>
                <input type='text' name='regNumber' value={formData.regNumber} onChange={handleChange} required/>
                <label>Name</label>
                <input type='text' name='name' value={formData.name} onChange={handleChange} required/>
                <label>Subject</label>
                <input type='text' name='subject' value={formData.subject} onChange={handleChange} required/>
                <label>Issue Description</label>
                <textarea name='description' value={formData.description} onChange={handleChange} required/>
                <label>Category</label>
                <select name='category' value={formData.category} onChange={handleChange} required>
                    <option value="Assignment">Assignment</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="System Issue">System Issue</option>
                    <option value="Others">Others</option>
                </select>
                <label>Course Code</label>
                <input type='text' name='course' value={formData.course} onChange={handleChange}required/>
                <label>Attachments</label>
                <input type='file' name='attachments'onChange={handleChange}/>
                <label>Year Of Study</label>
                <input type='number' name='year' value={formData.year} onChange={handleChange} required/>
                <label>Semester</label>
                <input type='text' name='semester' value={formData.semester} onChange={handleChange} required/>
                <label>Lecturer</label>
                <input type='text' name='lecturer' value={formData.lecturer} onChange={handleLecturerSearch}/>
                <div id='lecturerResults'>
                    {lecturerResults.map((lecturer,index) => (
                        <div key={index} onClick={() => handleLecturerSelect(Lecturer)}>{lecturer}</div>))}
                </div>
                <button type='submit' disabled={!isFormValid}>Submit Issue</button>
            </form>
        </div>
    );
}

export default issueform;