import { useEffect, useState } from "react";
//import PropTypes from "prop-types";
import './FormStyles.css';
import axios from 'axios';

const RequestAssistanceForm = () => {
    //state to hold form data
    const [formData, setFormData] = useState({
        lecturerName:'',
        department:'',
        courseCode:'',
        assistanceType:'',
        priorityLevel:'',
        description:'',
        attachment:'null',
        resolutionDate:'',
    });

    const [isFormValid, setIsFormValid] = useState(false);//state for form validity
    const [departments, setDepartments] = useState([]);//holds department
    const[filteredDepartments, setFilteredDepartments] = useState([]);

    useEffect(() => {
    const fetchDepartments = async () => {
        try{
            const response = await axios.get(`https://backend.com/api/departments`);
            setDepartments(response.data);
        } catch(error){
            console.error('Error fetching departments:',error);
        }
    };fetchDepartments();},[]);

   //handle hanges in inputfields     
    const handleChange = (e) => {
        const {name,value,type,files} = e.target;
        const updatedForm = {...formData, [name]:type === 'file' ? files[0] || null : value,};
        setFormData(updatedForm);
        checkFormValidity(updatedForm)

        if(name === 'department'){
            const filtered = departments.filter((dept) => 
            dept.toLowerCase().includes(value.toLowerCase()));setFilteredDepartments(filtered);
        }
    };
    //checking if all required fields are filled
    const checkFormValidity = (data) => {       
        const requiredFields = Object.keys(data).filter(field => field !== 'attachment');
        const isValid = requiredFields.every((field) => data[field]?.trim() !== '');
        setIsFormValid(isValid);
    };
      //Enter key
      const handleKeyDown = (e) => {
        if(e.key === 'Enter'){e.preventDefault();
            const formElements = Array.from(e.target.form.elements);
            const index = formElements.indexOf(e.target);
            if (index !== -1 && index < formElements.length - 1){formElements[index + 1].focus();}
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isFormValid) return;

        try{
            const response = await axios.post('https://backend.com/api/submit',formData);
            alert('Assistance Request Submitted Successfully');
            console.log(response.data);
        }catch(error){
            console.error('Error Submitting Request:',error);
            alert('Failed to submit request.Please Try Again.');
        }        
    };
    //Handle form reset(cancel button)
    const handleCancel = () => {
        setFormData({
            lecturerName:"",
            department:'',
            courseCode:'',
            assistanceType:'',
            priorityLevel:'',
            description:'',
            attachment:'null',
            resolutionDate:'',
        });
        setIsFormValid(false)
    };
    return(
        <div className="assistance">
            <h2> Lecturer Assistance Form</h2>
            <form onSubmit={handleSubmit} className="assistance-form">
                {/*Details For Lecturer*/}
                <div className="form">
                    <label>Lecturer Name</label>
                    <input type="text" name="lecturerName" placeholder="Enter name" value={formData.lecturerName} onChange={handleChange} onKeyDown={handleKeyDown} required/>
                </div>
                <div className="form">
                    <label>Department</label>
                    <input type="text" name ='department' placeholder='Search For Department'value={formData.department} onChange={handleChange} onKeyDown={handleKeyDown} required/>
                    {filteredDepartments.length > 0  && (
                        <ul className="ddropp">
                            {filteredDepartments.map((dept,index) => (
                                <li key={index} onClick={() => setFormData({ ...formData,department:dept})}>{dept}</li>
                            ))}
                        </ul>
                    )}
                </div>
                {/*Course Information*/}
                <div className="form">
                    <label>Course Code</label>
                    <input type="text" name="courseCode" placeholder="Enter course code" value={formData.courseCode} onChange={handleChange} onKeyDown={handleKeyDown} required/>
                </div>
                {/*Details for Issue*/}
                <div className="form">
                    <label>Type of Assistance</label>
                    <select type="text" name="assistanceType" value={formData.assistanceType} onChange={handleChange} onKeyDown={handleKeyDown} required>
                    <option value=''>Select...</option>
                    <option value='Grading'>Grading System</option>
                    <option value='Student Issue'>Student Issue</option>
                    <option value='Course Content'>Course Content</option>
                    <option value='Technical Support'>Technical Support</option>
                    <option value='Other'>Other</option>
                    </select>
                </div>
                <div className="form">
                    <label>Priority Level</label>
                    <select name="priorityLevel" value={formData.priorityLevel} onChange={handleChange} onKeyDown={handleKeyDown}required>
                        <option value=''>Select...</option>
                        <option value='High'>High</option>
                        <option value='Medium'>Medium</option>
                        <option value='Low'>Low</option>
                    </select>
                </div>
                <div className="form">
                    <label>Description</label>
                    <textarea name="description" placeholder="Describe the Issue" 
                    value={formData.description} onChange={handleChange} required
                    maxLength='500'
                    title="Maximum 500 Characters are allowed"
                    ></textarea>
                </div>
                <div className="form">
                    <label>Attachment</label>
                    <input type="file" name="attachment" onChange={handleChange}/>
                </div>
                <div className="form">
                    <label>Prefered Resolution Date</label>
                    <input type="date" name="resolutionDate" value={formData.resolutionDate} onChange={handleChange} required/>
                </div>
                {/*Buttons*/}
                <div className="btn-grrp">
                <button type="submit" disabled ={!isFormValid} className={isFormValid ? 'submit enabled':'submit disabled'}>Submit Request</button>
                <button type="button" onClick={handleCancel} className="cancel">Cancel</button>
                </div>
            </form>
        </div>        
    );
};

export default RequestAssistanceForm;