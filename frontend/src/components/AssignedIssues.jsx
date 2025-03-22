/*import React, {useState,useEffect} from 'react';
import './AssignedIssues.css';

const AssignedIssues = ({issues}) => {
    const [assignedIssues,setAssignedIssues] = useState([]);
    useEffect(() => {
        if (issues.length>0){
            setAssignedIssues(issues);
        }else{
            setAssignedIssues([
                {
                    id:1,
                    title:'Missing Marks For Exam',
                    category:'Grades',
                    status:'pending'    
                }
                {
                    id:2,
                    title:'Timetable Clash',
                    category:'Scheduling',
                    status:'Inprogress',
                }
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
            ()}
        </div>
    )
}*/