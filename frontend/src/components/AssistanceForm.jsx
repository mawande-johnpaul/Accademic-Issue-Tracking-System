import { useEffect, useState } from "react";
//import PropTypes from "prop-types";
import './FormStyles.css';
import axios from 'axios';

const RequestAssistanceForm = () => {
    //state to hold form data
    const [formData, setFormData] = useState({
        lecturerName:'',
        lecturerID:'',
        department:'',
        courseCode:'',
        courseName:'',
        assistanceType:'',
        priorityLevel:'',
        description:'',
        attachment:'null',
        resolutionDate:'',
        urgency:'',
        email:'',
        phone:'',
    });

    const [isFormValid, setIsFormValid] = useState(false);//state for form validity
    const [departments, setDepartments] = useState([]);//
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
        setFormData((prev) => {
            const updatedForm = {...prev, [name]:type === 'file' ? files[0] || null:value,};//store file if uploaded
            //console.log(`Updated Field: ${name} = `,value);
            checkFormValidity(updatedForm);//validate form after updating
            return updatedForm;
        })

        if(name === 'department'){
            const filtered = departments.filter((dept) => 
            dept.toLowerCase().includes(value.toLowerCase()));setFilteredDepartments(filtered);
        }
    };
    //checking if all required fields are filled
    const checkFormValidity = (data) => {       
        if (!data) return setIsFormValid(false);
        const requiredFields = Object.keys(formData).filter(field => field !== 'attachment');
        const isValid = requiredFields.every((field) => data[field] && data[field].trim() !== '');
        //console.log('Form Validity state:',isValid,data);
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
            lecturerID:'',
            department:'',
            courseCode:'',
            courseName:"",
            assistanceType:'',
            priorityLevel:'',
            description:'',
            attachment:'',
            resolutionDate:'',
            urgency:'',
            email:'',
            phone:''
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
                    <label>Lecturer ID</label>
                    <input type="text" name="lecturerID" placeholder="Enter Your ID" value={formData.lecturerID} onChange={handleChange} onKeyDown={handleKeyDown}required/>
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
                <div className="form">
                    <label>Course Name</label>
                    <input type="text" name="courseName" placeholder="Enter name for course..." value={formData.courseName} onChange={handleChange} onKeyDown={handleKeyDown}required/>
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
                <div className="form">
                    <label>Urgency</label>
                    <select name="urgency" value={formData.urgency} onChange={handleChange} onKeyDown={handleKeyDown}>
                        <option value=''>Select...</option>
                        <option value='Immediate'>Immediate</option>
                        <option value='Within a Week'>Within a Week</option>
                        <option value='No Urgency'>No Urgency</option>
                    </select>
                </div>
                {/*contact info*/}
                <div className="form">
                    <label>Email</label>
                    <input type="email"  name='email' value={formData.email} onChange={handleChange} placeholder="name@gmail.com" onKeyDown={handleKeyDown} required/>
                </div>
                <div className="form">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" placeholder="Enter Phone Number (0766870021)" 
                    value={formData.phone} onChange={handleChange} onKeyDown={handleKeyDown}
                    maxLength='10 || 11'
                    title="Phone number should be between 1 to 10 atmost 11"
                    pattern="\d{1,10}"
                    required/>
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