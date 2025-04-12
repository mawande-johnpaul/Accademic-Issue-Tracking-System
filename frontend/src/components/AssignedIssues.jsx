import {useState,useEffect} from 'react';
import './AssignedIssues.css';
import PropTypes from 'prop-types';


const AssignedIssues = () => {
    const [displayIssues,setDisplayIssues] = useState([]);
    const [priority,setPriority] = useState('ALL');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    //fetch assigned issues from backend
    const fetchIssues = async() => {
        const token = localStorage.getItem('authToken');
        try{
            const response = await fetch('http://127.0.0.1:8000/issues/',{
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'content-Type':'application/json'
                }
            });
            if (!response.ok){
                if(response.status === 401 || response.status === 403){
                    console.error('Unauthorised. Token may be Missing or Expired.');
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                    return;
                }
                throw new Error('Failed to fetch Issues.');
            }
            const data = await response.json();
            setDisplayIssues(data);
            localStorage.setItem('assignedIssues',JSON.stringify(data));
        } catch (error){
            console.error("Error Fetching Issues:",error);
              setDisplayIssues([]);
        }finally{setLoading(false);}
    };
    fetchIssues();},[]);

   const filteredIssues = priority === 'ALL' ? displayIssues:displayIssues.filter(issue => issue.priority === priority);
        
    return (
        <div className='assigned'>
            {loading ? (<div className='noissuescontainer'>
                <h2>Assigned Issues</h2>
                <p className='noissues'>Loading Assigned Issues,Please Wait...</p></div>):
                filteredIssues.length === 0 ? (<div className='noissuescontainer'>
                    <p className='noissues'>Relax! You are not assigned any issues for now</p></div>):(
            <>
            <div className='bUTTONs'>                
                <div className='Priority-DropDown'>
                    <button className='P-Btn'>Priority</button>
                    <div className='dropcontent'>
                        <button onClick={() => setPriority('High')}>High</button>
                        <button onClick={() => setPriority('Medium')}>Medium</button>
                        <button onClick={() => setPriority('Low')}>Low</button>
                    </div>
                </div>
                <button className='AlL' onClick={() => setPriority('ALL')}>All</button>
            </div>           
            
                <div className='issues-gridd'>
                    
                    {filteredIssues.map((issue) => (<div key={issue.id} className="isssue-cardd">
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
                </>
            )}
        </div>
    );
};
AssignedIssues.propTypes = {
    issues:PropTypes.array.isRequired,
};
export default AssignedIssues;