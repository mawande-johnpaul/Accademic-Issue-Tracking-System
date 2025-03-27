import {useState,useEffect} from 'react';
import './AssignedIssues.css';
import PropTypes from 'prop-types';


const AssignedIssues = () => {
    const [displayIssues,setDisplayIssues] = useState([]);
    //fetch assigned issues from backend
    const fetchIssues = async() => {
        try{
            const response = await fetch('http://127.0.0.1:8000/issues/');
            const data = await response.json();
            setDisplayIssues(data);
        } catch (error){
            console.error("Error Fetching Issues:",error);
        
        //setting mockdata incase backend fails.

            setDisplayIssues([
                {
                    id:1,
                    title:'Missing Marks For Exam',
                    priority:'High',
                    deadline:'04/10/25',
                    category:'Grades',
                    status:'pending',
                    description:"Marks for previous paper are missing"   
                },
                {
                    id:2,
                    title:'Timetable Clash',
                    priority:"Medium",
                    deadline:"04/15/25",
                    category:'Scheduling',
                    status:'Inprogress',
                    description:"Two exams at the same time"
                },
                {
                    id:3,
                    title:'Course Enrollment',
                    priority:"Low",
                    deadline:"04/20/25",
                    category:'Enrollment',
                    status:'Resolved',
                    description:"Student Unable to register for a required course unit"
                },
            ]);
        }
    };

    useEffect(() => {fetchIssues();},[]);//fetch data when component mounts.
    return (
        <div className='assigned'>
            <h2>Assigned Issues</h2>
            {displayIssues.length === 0 ? (<p>No Assigned Issues Found.</p>)
            :(
                <div className='issues-gridd'>
                    
                    {displayIssues.map((issue) => (<div key={issue.id} className="isssue-cardd">
                    <div className='isssue-head'>
                        <h3>{issue.title}</h3>
                        <span className='priority'><strong>Priority : </strong>{issue.priority}</span>
                        <span className='deadline'><strong>Deadline : </strong>{issue.deadline}</span>
                    </div>    
                        <p><strong>Category:</strong>{issue.category}</p>
                        <p><strong>Status:</strong>{issue.status}</p>
                        <p><strong>Description:</strong>{issue.description}</p>
                        <div className='btn-container'>
                        <button className='report'>Report</button>
                        <button className='details'>View Details</button>
                        </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
AssignedIssues.propTypes = {
    issues:PropTypes.array.isRequired,
};
export default AssignedIssues;