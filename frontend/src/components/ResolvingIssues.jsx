import {useState, useEffect} from 'react';
import './ResolvingIssues.css';



const ResolvingIssues = () => {
    //state variables
    const [allIssues, setAllIssues] = useState([]);//all resolved issues
    const [visibleIssues, setVisibleIssues] = useState([]);//issues currently shown on screen
    const [recentlyRemoved, setRecentlyRemoved] = useState([]);//issues moved to recent
    const [filter,setFilter] = useState('all');//current filter view
    const [confirmDelete, setConfirmDelete] = useState(null);//for confirming delete
    const [toastMsg,setToastMsg] = useState('');//message display for feedback

    //fetch issues from backend
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

    //update visible issues when filter or issue list changes
    useEffect(() => {
        if(filter === 'recent'){
            setVisibleIssues(recentlyRemoved);
        }else if (filter === 'all'){
            setVisibleIssues(allIssues);
        }
    }, [recentlyRemoved, allIssues, filter]);

    //move issues to recent list
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

   //Permanently delete issue from recent
   const handleDelete = (id) => {
    setRecentlyRemoved(prev => prev.filter(issue => issue.id !== id));
    setConfirmDelete(null);
    setTimeout(() => {
        setToastMsg('Issue Permanently Deleted');
        setTimeout(() => setToastMsg(''),3000);
    },100);
   };

    //Restore issue back all list
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
   
   //Handle tab switching ie ALL / Recent
    const handleFilterChange = (type) => {
        setFilter(type);
        setConfirmDelete(null);
    };

    return(
        <div className='resolving'>
            {/* Header with filter buttons */}
            <div className='resolved-header'>
                <h2>Resolved Issues</h2>
                <div className='F-btns'>
                    <button className={filter === "recent" ? "active" : ""} onClick={() => handleFilterChange('recent')}>Recent</button>
                    <button className={filter === 'all' ? "active" : ""} onClick={() => handleFilterChange("all")}>All</button>
                </div>
            </div>  
            
            {/* Display message when no issues to show */}
            {visibleIssues.length === 0 ? (
                <div className='no-issues-container'>
                    {filter === 'recent'? (<p className='no-issues-msg'>No recently removed Issues available</p>
                    ):(
                        <p className='no-issues-msg'>No Resolved Issues Available</p>
                    )}
                    </div>
            ):(
                //Issue list cards
                <div className='issues-griid'>
                    {visibleIssues.map((issue) => (
                        <div key={issue.id} className='isuse-card'>
                            <div className='issue-Head'>
                                <span className='isuse-title'>{issue.title}</span>                              
                            </div>
                            <p><strong>Status:</strong>{issue.status}</p>
                            {/* Action buttons based on filter */}
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

                            {/* confirm delete box for recent tab */}                               
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
            {/* Toast feedback message */}
            {toastMsg && (<div className='toast'>{toastMsg}</div>)}
        </div>
    );
};


export default ResolvingIssues;