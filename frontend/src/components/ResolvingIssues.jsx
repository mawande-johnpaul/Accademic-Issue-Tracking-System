import {useState, useEffect} from 'react';
import './ResolvingIssues.css';



const ResolvingIssues = () => {
    const [allIssues, setAllIssues] = useState([]);
    const [visibleIssues, setVisibleIssues] = useState([])
    const [filter,setFilter] = useState('all');
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [noRecent, setNoRecent] = useState("");

    useEffect(() => {
        const fetchResolvingIssues = async () => {
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
                {id:1,title:'Exam Marks',priority:'High',deadline:'03/15/25',status:'Resolved',resolvedDate:'2025-03-28'},
                {id:2,title:'Enrollment',priority:'Medium',deadline:'02/28/25',status:'Resolved',resolvedDate:'2025-03-20'},
                {id:3,title:'Course-Registration',priority:'Low',deadline:'02/30/25',status:'Resolved',resolvedDate:'2025-02-01'}
            ]
            setAllIssues(mockdata);
            setVisibleIssues(mockdata);
        
        }
    };
    fetchResolvingIssues();
    },[]);

   const handleRemove = (id) => {
    const updated = visibleIssues.filter((issue) => issue.id !== id);setVisibleIssues(updated);
    setConfirmDelete(null); alert("Issue Deleted");
   };
    /*const handleFilterChange = (type) => {
        setFilter(type);
        if (type==='all') {
            setVisibleIssues((prevVisible) => allIssues.filter((issue) => prevVisible.some((vis)=> vis.id === issue.id)));
        }else {setVisibleIssues(allIssues);            
        }
        setConfirmDelete(null);
    };*/
    const handleFilterChange = (type) => {
        setFilter(type);
        if(type === 'all'){
            setVisibleIssues(allIssues);
            setNoRecent('');
        } else if (type === 'recent'){
           const today = new Date();
           const recentIssues = allIssues.filter((issue) => {
            if(!issue.resolvedDate) return false;
            const resolvedDate = new Date(issue.resolvedDate);
            const diffDays = (today - resolvedDate)/(1000*60*60*24);
            return diffDays <= 7;
           });

           if (recentIssues.length === 0){
            setNoRecent('No recent issues found. Showing all resolved issues instead.');
            setVisibleIssues(allIssues);
            setFilter('all');
            setTimeout(() => {setNoRecent('');},4000);
           }else{
            setVisibleIssues(recentIssues);
            setNoRecent('');
           }
    }
    setConfirmDelete(null);
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
            {noRecent && (<div className='infomsg'>{noRecent}</div>)}           

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
                                <button className='remove' onClick={() => setConfirmDelete(issue.id)}>Remove</button>
                                <button className='reopen'>Re-Open</button>
                            </div>
                               {/* {confirmDelete === issue.id && (<div className='confirmBox'>
                                    
                                    <p>Are You Sure You Want To Remove This Issue?</p>
                                    <div className='coactions'>
                                    <button className='yes-btn' onClick={() => handleRemove(issue.id)}>Yes</button>
                                    <button className='no-btn' onClick={() => setConfirmDelete(null)}>No</button>
                                    </div>
                                    </div>
                                )}*/}
                                {confirmDelete === issue.id && (
                                    <div className='floatingconfirm'>
                                    <div className='floconfirm'><p className='confirmMessage'>Are you sure you want to remove this issue?</p>
                                    <div className='confbuttons'>
                                        <button className='yes-btn' onClick={() => handleRemove(issue.id)}>Yes</button>
                                        <button className='no-btn' onClick={() =>setConfirmDelete(null)}>No</button>
                                    </div>
                                    </div>
                                    </div>                                    
                                    )}                           
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default ResolvingIssues;