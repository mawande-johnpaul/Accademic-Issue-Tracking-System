import {useState,useEffect} from 'react';
import './AssignedIssues.css';
import PropTypes from 'prop-types';
import ProgressForm from './ProgressForm';


const AssignedIssues = () => {
    //state declaration
    const [displayIssues,setDisplayIssues] = useState([]);
    const [priority,setPriority] = useState('ALL');
    const [loading, setLoading] = useState(true);
    
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [showProgressForm, setShowProgressForm] = useState(false);

    ////fetch assigned issues from backend
    useEffect(() => {    
    const fetchIssues = async() => {
        const token = localStorage.getItem('authToken');
        try{
            const response = await fetch('http://127.0.0.1:8000/issues/',{
                headers:{
                    'Authorization':`Bearer ${token}`,//send token to Authenticate
                    'Content-Type':'application/json'//tell backkend that we are sending/expeecting a json
                }
            });
            //Handle failed fetch due to expired or missing token
            if (!response.ok){
                if(response.status === 401 || response.status === 403){
                    console.error('Unauthorised. Token may be Missing or Expired.');
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';//redirect to login page
                    return;
                }
                throw new Error('Failed to fetch Issues.');
            }
            const data = await response.json();//convert response to JSON
            setDisplayIssues(data);//store real data(issues in state)
            localStorage.setItem('assignedIssues',JSON.stringify(data));//cache 
        } catch (error){
            console.error("Error Fetching Issues:",error);          
                setDisplayIssues([]);//set empty list if fetch fails
        }finally{setLoading(false);//stops loader once fetch is done
            }
    };
    fetchIssues();},[]);//Triggers fetch on mount

//filter issues based on  priority
   const filteredIssues = priority === 'ALL' ? displayIssues:displayIssues.filter(issue => issue.priority === priority);
        
    return (
        <div className='assigned'>  
        {/*Loading State */}          
            {loading ? (<div className='noissuescontainer'>                
                <p className='noissues'>Loading Assigned Issues,Please Wait...</p></div>):(
                    <>
                    {/*Dynamic heading */}
                    {showProgressForm && selectedIssue ? (<h2>Submit Progress Report</h2>):
                    filteredIssues.length> 0 ?(<h2>Assigned Issues</h2>):null}
                    {/*Progress form when reporting*/}
                    {showProgressForm && selectedIssue ? (<ProgressForm issue={selectedIssue}
                    onClose={() => {setSelectedIssue(null);
                        setShowProgressForm(false);
                    }}/>):(//No issues found
                filteredIssues.length === 0 ? (<div className='noissuescontainer'>
                    <p className='noissues'>Relax! You are not assigned any issues for now</p></div>):(
            <>      
            {/*Priority filter buttons*/}      
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
            {/*Assigned Issues card*/}
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
                        <button className='report' onClick={()=>{setSelectedIssue(issue);
                            setShowProgressForm(true);
                        }}>Report</button>
                        <button className='details'>View Details</button>
                        </div>
                        </div>
                    ))}
                </div>  
               </>
            )
            )}            
            </>
            )}
        </div>
    );
};
//Receiving issues as props from a parent component
AssignedIssues.propTypes = {
    issues:PropTypes.array.isRequired,
};
export default AssignedIssues;