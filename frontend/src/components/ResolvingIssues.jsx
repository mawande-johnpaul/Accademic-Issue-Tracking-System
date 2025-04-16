import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
//import ProgressForm from './ProgressForm';
//import RequestAssistanceForm from './AssistanceForm';
//import IssueDetails from './IssueDetails';
import './ResolvingIssues.css';


const ResolvingIssues = () => {
    const [resolvedIssues,setResolvedIssues] = useState([]);
    const [filter,setFilter] = useState('all');

    useEffect(() => {
        const fetchResolvingIssues = async () => {
            try{
                const response = await fetch(`${'#'}/resolved-issues`);
                    const data = await response.json();
                    console.log('Fetched Resolved Issues:',data);
                    setResolvedIssues(data);
            } catch(error) {
            console.error("Error Fetching Resolved Issues:",error);

            //use mock data when error fetching occurs
            setResolvedIssues([
                {id:1,title:'Exam Marks',priority:'High',deadline:'03/15/25',status:'Resolved',},
                {id:2,title:'Enrollment',priority:'Medium',deadline:'02/28/25',status:'Resolved'},
                {id:3,title:'Course-Registration',priority:'Low',deadline:'02/30/25',status:'Resolved'}
            ]);        
        }
    };
    fetchResolvingIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },['#']);

    return(
        <div className='resolving'>
            <div className='resolved-header'>
                <h2>Resolved Issues</h2>
                <div className='F-btns'>
                    <button className={filter === "recent" ? "active" : ""} onClick={() => setFilter('recent')}>Recent</button>
                    <button className={filter === 'all' ? "active" : ""} onClick={() => setFilter("all")}>All</button>
                </div>
            </div>

            {resolvedIssues.length === 0 ? (
                <p>No Resolved Issues Available.</p>
            ):(
                <div className='issues-griid'>
                    {resolvedIssues.filter((issue) => (filter === "recent" ? issue.status === "Resolved" : true))
                    .map((issue) => (
                        <div key={issue.id} className='isuse-card'>
                            <div className='issue-Head'>
                                <span className='isuse-title'>{issue.title}</span>
                               {/* <span className='priOrity'>{issue.priority}</span>
                                <span className='deaDline'>{issue.deadline}</span>*/}
                            </div>
                            <p><strong>Status:</strong>{issue.status}</p>
                            <div className='button-ccontainer'>
                                <button className='remove'>Remove</button>
                                <button className='reopen'>Re-Open</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

ResolvingIssues.protoTypes = {
    url:
    PropTypes.string.isRequired,
};

export default ResolvingIssues;