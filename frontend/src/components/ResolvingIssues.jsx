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
            setAllIssues([]);
            setVisibleIssues([]);        
        }
    };
    fetchResolvingIssues();
    },[]);

    useEffect(() => {
        if(filter === 'recent'){
            setVisibleIssues(recentlyRemoved);
        }else if (filter === 'all'){
            setVisibleIssues(allIssues);
        }
    }, [recentlyRemoved, allIssues, filter]);

   const handleRemove = (id) => {
   const issueToRemove = allIssues.find(issue => issue.id === id);
   if (issueToRemove){
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
    setConfirmDelete(null);
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
        setConfirmDelete(null);
        setTimeout(() => {
            setToastMsg('Issue Restored Successfully');
            setTimeout(() => setToastMsg(''),3000);
        },100);
    }
   };
   
    const handleFilterChange = (type) => {
        setFilter(type);
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
                <div className='no-issues-container'>
                    {filter === 'recent'? (<p className='no-issues-msg'>No recently removed Issues available</p>
                    ):(
                        <p className='no-issues-msg'>No Resolved Issues Available</p>
                    )}
                    </div>
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
                                <button className='remove' onClick={() => handleRemove(issue.id)}>Remove</button>
                                <button className='reopen'>Re-Open</button>
                                    </>
                                ):(
                                <>
                                <button className='remove' onClick={() => setConfirmDelete(issue.id)}>Delete</button>
                                <button className='reopen' onClick ={ () => handleRestore(issue.id)}>Restore</button>
                                </>
                                )}
                            </div>                               
                                {confirmDelete === issue.id && filter === 'recent' && (
                                    <div className='floatingconfirm'>
                                    <div className='floconfirm'><p className='confirmMessage'>Are you sure you want to Permanently delete this issue?</p>
                                    <div className='confbuttons'>
                                        <button className='yes-btn' onClick={() => handleDelete(issue.id)}>Yes</button>
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