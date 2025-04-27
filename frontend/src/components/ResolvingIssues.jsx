import {useState, useEffect} from 'react';
import './ResolvingIssues.css';



const ResolvingIssues = () => {
    const [allIssues, setAllIssues] = useState([]);
    const [visibleIssues, setVisibleIssues] = useState([]);
    const [recentlyRemoved, setRecentlyRemoved] = useState([]);
    const [filter,setFilter] = useState('all');
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [toastMsg,setToastMsg] = useState('');

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
   const issueToRemove = allIssues.find(issue => issue.id === id);
   if (issueToRemove){
    setVisibleIssues(prev => prev.filter(issue => issue.id !== id));
    setAllIssues(prev => prev.filter(issue => issue.id !== id));
    setRecentlyRemoved(prev => [...prev, issueToRemove]);
    setConfirmDelete(null);
    setTimeout(() =>{
        setToastMsg('Issue Moved To Recent');
        setTimeout(() => setToastMsg(''),3000);
   },100);
    }
   };

   const handleDelete = (id) => {
    setRecentlyRemoved(prev => prev.filter(issue => issue.id !== id));
    setTimeout(() => {
        setToastMsg('Issue Permanently Deleted');
        setTimeout(() => setToastMsg(''),3000);
    },100);
   };

   const handleRestore = (id) => {
    const issueToRestore = recentlyRemoved.find(issue => issue.id === id);
    if(issueToRestore){
        setAllIssues(prev => [...prev, issueToRestore]);
        setRecentlyRemoved(prev => prev.filter(issue => issue.id !== id));
        setToastMsg('Issue Restored successfully');        
        setFilter('all');
        setVisibleIssues(prev => [...prev, issueToRestore]);
        setTimeout(() => {
            setToastMsg('Issue Restored Successfully');
            setTimeout(() => setToastMsg(''),3000);
        },100);
    }
   };
   
    const handleFilterChange = (type) => {
        setFilter(type);
        if (type == 'all'){
            setVisibleIssues(allIssues);
        } else if (type === 'recent'){setVisibleIssues(recentlyRemoved);}
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

            {visibleIssues.length === 0 ? (
                <p>No Issues Available.</p>
            ):(
                <div className='issues-griid'>
                    {visibleIssues.map((issue) => (
                        <div key={issue.id} className='isuse-card'>
                            <div className='issue-Head'>
                                <span className='isuse-title'>{issue.title}</span>                              
                            </div>
                            <p><strong>Status:</strong>{issue.status}</p>
                            <div className='button-ccontainer'>
                                {filter === 'all' ? (
                                    <>
                                <button className='remove' onClick={() => setConfirmDelete(issue.id)}>Remove</button>
                                <button className='reopen'>Re-Open</button>
                                    </>
                                ):(
                                <>
                                <button className='remove' onClick={() => handleDelete(issue.id)}>Delete</button>
                                <button className='reopen' onClick ={ () => handleRestore(issue.id)}>Restore</button>
                                </>
                                )}
                            </div>                               
                                {confirmDelete === issue.id && filter === 'all' && (
                                    <div className='floatingconfirm'>
                                    <div className='floconfirm'><p className='confirmMessage'>Are you sure you want to move this to Recent?</p>
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
            {toastMsg && (<div className='toast'>{toastMsg}</div>)}
        </div>
    );
};


export default ResolvingIssues;