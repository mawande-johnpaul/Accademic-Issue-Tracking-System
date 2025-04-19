import {useState, useEffect} from 'react';
import './ResolvingIssues.css';


const ResolvingIssues = () => {
    const [allIssues, setAllIssues] = useState([]);
    const [visibleIssues, setVisibleIssues] = useState([])
    const [filter,setFilter] = useState('all');

    useEffect(() => {
        const fetchReolvingIssues = async () => {
            try{
                const response = await fetch(`${'#'}/resolved-issues`);
                    const data = await response.json();
                    console.log('Fetched Resolved Issues:',data);
                    setAllIssues(data);
                    setVisibleIssues(data);
            } catch(error) {
            console.error("Error Fetching Resolved Issues:",error);

            //use mock data when error fetching occurs
            const mockdata = [
                {id:1,title:'Exam Marks',priority:'High',deadline:'03/15/25',status:'Resolved',},
                {id:2,title:'Enrollment',priority:'Medium',deadline:'02/28/25',status:'Resolved'},
                {id:3,title:'Course-Registration',priority:'Low',deadline:'02/30/25',status:'Resolved'}
            ]
            setAllIssues(mockdata);
            setVisibleIssues(mockdata);
        
        }
    };
    fetchReolvingIssues();
    },[]);

    const handleRemove = (id) => {const updatedVisibleIssues = visibleIssues.filter((issue) =>
        issue.id !== id); setVisibleIssues(updatedVisibleIssues);
    };
    
    const handleFilterChange = (type) => {
        setFilter(type);
        if (type==='all') {
            setVisibleIssues((prevVisible) => allIssues.filter((issue) => prevVisible.some((vis)=> vis.id === issue.id)));
        }else if (type === 'recent'){setVisibleIssues(allIssues);            
        }
    };

    return(
        <div className='resolving'>
            <div className='resolved-header'>
                <h2>Resolved Issues</h2>
                <div className='F-btns'>
                    <button className={filter === "recent" ? "active" : ""} onClick={() => handleFilterChange('recent')}>Recent</button>
                    <button className={filter === 'all' ? "active" : ""} onClick={() => handleFilterChange("all")}>All</button>
                </div>
            </div>

            {visibleIssues.length === 0 ? (
                <p>No Resolved Issues Available.</p>
            ):(
                <div className='issues-griid'>
                    {visibleIssues.map((issue) => (
                        <div key={issue.id} className='isuse-card'>
                            <div className='issue-Head'>
                                <span className='isuse-title'>{issue.title}</span>                              
                            </div>
                            <p><strong>Status:</strong>{issue.status}</p>
                            <div className='button-ccontainer'>
                                <button className='remove' onClick={() => handleRemove(issue.id)}>Remove</button>
                                <button className='reopen'>Re-Open</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default ResolvingIssues;