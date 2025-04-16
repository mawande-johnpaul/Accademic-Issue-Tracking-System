import  { useState, useEffect } from 'react';
import './issuesubmission.css';

const IssueSubmission = () => {
    const [formData, setFormData] = useState({
        title:'',
        studentId:'',
        regNumber:'',
        name:'',
        subject:'',
        description:'',
        Category:'',
        courseCode:'',
        year:'',
        semester:'',
        lecturer:'',
    });

    const [lecturers, setLecturers] = useState([]);
    const [filteredLecturers, setFilteredLecturers] = useState([]);

    useEffect(() => {
        fetch('http')
        .then(response => response.json())
        .then(data => setLecturers(data))
        .catch(error => console.error('Error Fetching Lecturers:',error));
    }, []);

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };
    const isFormValid = () => Object.values(formData).every(value => value.trim() !== '');
    
    const validateForm  = (e) => {
        e.preventDefault();
        if (isFormValid()){
            alert('Form Submitted Successfully');
            console .log('Form Data:',formData);
        }else {alert('Please Fill-Out all The Required Fields');}
    };

    const searchLecturer = (e) => {
        const lect = e.target.value.toLowerCase();
        setFilteredLecturers(lecturers.filter(lecturer => lecturer.toLowerCase().includes(lect)));
        setFormData({ ...formData, lecturer: e.target.value});
    };
    const selectLecturer = (name) => {
        setFormData({ ...formData,lecturer:name});
        setFilteredLecturers([]);
    };

    return(
        <div className='container'>
            <h1>Submit An Academic Issue</h1>
            <form id='issueform' onSubmit={validateForm}>
                <label htmlFor='title'>Issue Title</label>
                <input type='text' id='title' name='title' required placeholder='Enter Title for The Issue' onChange={handleInputChange}/>
                <label htmlFor='studentId'>Student ID</label>
                <input type='text' id='studentId' name='studentId'required placeholder='Enter Your Student ID Number' onChange={handleInputChange}/>
                <label htmlFor='regNumber'>Reg Number</label>
                <input type='text' id='regNumber' name='regNumber' required placeholder='Enter Your Registration Number' onChange={handleInputChange}/>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' required placeholder='Enter Your Name' onChange={handleInputChange}/>
                <label htmlFor='subject'>Course-Unit</label>
                <input type='text' id='subject' name='subject' required placeholder='Enter The Course Unit' onChange={handleInputChange}/>
                <label htmlFor='description'>Issue Description</label>
                <textarea id='description' name='description' required placeholder='Describe Your Issue' onChange={handleInputChange}></textarea>
                <label htmlFor='category'>Category</label>
                <select id='category' name='category' required onChange={handleInputChange}>
                    <option value=''>--Select Category--</option>
                    <option value='course Registration'>Course Registration</option>
                    <option value='Missing Marks'>Missing Marks</option>
                    <option value='Timetable Clash'>Timetable Clash</option>
                    <option value='Lecturer Concern'>Lecturer Concern</option>
                    <option value='Examination Issue'>Examination Issue</option>
                    <option value='Other'>Other</option>
                </select>

                <label htmlFor='courseCode'>Course-Code</label>
                <input type='text' id='courseCode' name='courseCode' required placeholder='Enter the Course Code e.g CSC' onChange={handleInputChange}/>
                <label htmlFor='attachments'>Attachments</label>
                <input type='file' id='attachments' name='attachments'/>
                <label htmlFor='year'>Year of Study</label>
                <input type='number'id='year' name='year' required placeholder='Enter Year of Study e.g 2020' onChange={handleInputChange}/>
                <label htmlFor='semester'>Semester</label>
                <input type='text' id='semester' name='semester' required placeholder='Enter The Semester' onChange={handleInputChange}/>
                <label htmlFor='lecturer'>Lecturer</label>
                <div className='lecturer-container'>
                    <input type='text' id='lecturerSearch' name='lecturer' required placeholder='Search for Lecturer' value={formData.lecturer} onChange={searchLecturer}/>
                    <span className='search-text'>Search</span>
                </div>
                {filteredLecturers.length > 0 && (
                    <ul className='lecturer-dropdown'>
                        {filteredLecturers.map((lecturer, index) => (
                            <li key={index} onClick={() => selectLecturer(lecturer)}>{lecturer}</li>
                        ))}
                    </ul>
                ) }
                <div className='footer'>
                    <button type='submit' id='submitButton'>Sumit Issue</button>
                    <a href='#' className='back'>Back</a>
                </div>
            </form>
        </div>
    );
};

export default IssueSubmission;