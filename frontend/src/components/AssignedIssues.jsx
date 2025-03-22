import {useState,useEffect} from 'react';
import './AssignedIssues.css';

// eslint-disable-next-line react/prop-types
const AssignedIssues = ({issues}) => {
    const [assignedIssues,setAssignedIssues] = useState([]);
    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        if (issues.length>0){
            setAssignedIssues(issues);
        }else{
            setAssignedIssues([
                {
                    id:1,
                    title:'Missing Marks For Exam',
                    category:'Grades',
                    status:'pending'    
                },
                {
                    id:2,
                    title:'Timetable Clash',
                    category:'Scheduling',
                    status:'Inprogress',
                },
                {
                    id:3,
                    title:'Course Enrollment',
                    category:'Registration',
                    status:'Resolved'
                },
            ]);
        }
    },[issues]);

    return(
        <div className='assigned'>
            <h2>Assigned Issues</h2>
            {assignedIssues.length === 0 ? (<p>No Assigned Issues Found.</p>):
            (
                <div className='issues-container'>{assignedIssues.map((issue) =>(
                    <div key={issue.id} className='issue-card'>
                        <h3>{issue.title}</h3>
                        <p><strong>Category:</strong>{issue.category}</p>
                        <p><strong>Status:</strong>{issue.status}</p>
                        <button>View Details</button>
                    </div>
                    ))}   
                </div>
            )}
        </div>
    );
};
export default AssignedIssues;