import {useState, useEffect} from 'react';
import './ViewIssues.css';

const sampleIssues = [
    {
        id:1,
        title:'Some Students are unable to enroll'
    },
    {
        id:2,
        title:'Some Students are unable to Register'
    },
];

const ResolvedIssues = () => {
    const[issues, setIssues] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const fetchIssues = async () => {
            try{
                const response = await fetch('#');
                if(!response.ok) {throw new Error(`HTTP error!Status:${response.status}`);}
                const data = await response.json();
                setIssues(data);
            } catch (err) {
                console.error("Error Fetching Issues:",err);
                setError("Failed to fetch issues from Server.");
            }finally{
                setLoading(false);
            }
        };
        setTimeout(() => {
            setIssues(sampleIssues);
            setLoading(false);
        },1000);
    },[]);
    
    const handleFormSubmit = (e,issueId) => {
        e.preventDefault();
        console.log(`Reporting progress for issue ${issueId}`);
    };
    if (loading) {
        return <div className='card'>Loading Issues being Resolved...</div>;
    }
    if(error){
        return <div className='card'>Error Fetching Issues:{error}</div>;
    }
    return (
        <div className='card resolved-issues'>
            <h2>Issues Being Resolved</h2>
            {issues.length ? (issues.map((issue) => (
                <div key={issue.id} className='issue-card'>
                    <h3>{issue.title}</h3>
                    <p>{issue.description}</p>
                    <form onSubmit = {(e) => handleFormSubmit(e, issue.id)}>
                        <textarea placeholder='Report Progress..' required className='progress'/>
                        <button type='submit' className='submit-btn'>Report Progress</button>
                    </form>
                    <div className='buttons'>
                        <button onClick={() => console.log(`Request more info for Issue ${issue.id}`)} className='btn'>Request More Info</button>
                        <button onClick={() => console.log(`Request help for issue ${issue.id}`)} className='btn'>Ask Another Lecturer For Help</button>
                        <button onClick={() => console.log(`Pass to another lecturer for issue ${issue.id}`)} className='btn'>Pass To Another Lecturer</button>
                    </div>
                </div>
                ))
            ):(<p>No issues being resolved at the moment.</p>)}
        </div>
    );
};
export default ResolvedIssues;