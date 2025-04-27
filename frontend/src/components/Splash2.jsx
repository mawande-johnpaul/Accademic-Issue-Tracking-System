import React, { useEffect, useState } from "react";

const Splash2 = ({ role, issues = [], newissues = [], assignedissues = [] }) => {
  const [seen, setSeen] = useState([]);
  const [unseen, setUnseen] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [quote, setQuote] = useState("");

  const studentQuotes = [
    "You're not behind, you're just building up momentum.",
    "That assignment won’t submit itself… unless you train an AI.",
    "Study hard, nap harder.",
    "Late nights, early grades!",
    "You're basically a knowledge sponge. Keep soaking!",
    "Don't worry, failure is just a prerequisite to genius.",
    "You're closer to graduation than you were yesterday.",
    "CTRL + S your life. Often.",
    "Just one more task. Then Netflix. Maybe.",
    "You got this, even if your GPA says otherwise."
  ];

  const lecturerQuotes = [
    "They don’t know you invented the curve…",
    "You’re the reason 'Deadline' feels like ‘Dreadline’.",
    "Educators: the real MVPs behind every degree.",
    "You make hard things understandable — that’s magic.",
    "Behind every confused student is a calm lecturer (hopefully).",
    "Your inbox may be full, but so is your impact.",
    "PowerPoint can’t capture how brilliant your mind is.",
    "Another day, another class saved.",
    "Turning caffeine into curriculum since forever.",
    "You don’t just teach — you inspire."
  ];

  const registrarQuotes = [
    "You’re the glue that holds the chaos together.",
    "If organization were a sport, you'd win gold.",
    "You're not just behind the scenes — you're behind the success.",
    "You manage students, staff, and still stay sane. Legendary.",
    "Deadlines fear you.",
    "No one appreciates you enough — we do.",
    "Every resolved issue is a quiet victory.",
    "Your role is admin — but you’re a silent hero.",
    "Crisis manager? More like calm-inator.",
    "Coffee. Forms. Patience. Repeat."
  ];


  useEffect(() => {
    const seenIssues = [];
    const unseenIssues = [];
    const resolvedIssues = [];
    const overdueIssues = [];
    const upcomingIssues = [];

    const today = new Date();

    for (const issue of issues) {
      if (issue.status === "Seen") {
        seenIssues.push(issue);
      } else if (issue.status === "Unseen") {
        unseenIssues.push(issue);
      } else if (issue.status === "Resolved") {
        resolvedIssues.push(issue);
      }
    }

    const getRandomQuote = () => {
        let quotes;
        if (role === "student") quotes = studentQuotes;
        else if (role === "lecturer") quotes = lecturerQuotes;
        else if (role === "registrar") quotes = registrarQuotes;
        else quotes = ["Keep pushing — you're doing great!"];
        return quotes[Math.floor(Math.random() * quotes.length)];
      };

    const checkOverdue = (issueList) => {
      for (const issue of issueList) {
        const deadline = new Date(issue.deadline);
        if (deadline < today && issue.status !== "Resolved") {
          overdueIssues.push(issue);
        } else {
          upcomingIssues.push(issue);
        }
      }
    };

    if (role === "lecturer" || role === "registrar") {
      checkOverdue(newissues);
      checkOverdue(assignedissues);
    }

    setSeen(seenIssues);
    setUnseen(unseenIssues);
    setResolved(resolvedIssues);
    setOverdue(overdueIssues);
    setUpcoming(upcomingIssues);
    setQuote(getRandomQuote());
  }, []);

  const StatCard = ({ count, label, color }) => (
    <div style={{
      background: color,
      padding: '20px',
      borderRadius: '10px',
      margin: '10px',
      color: '#fff',
      textAlign: 'center',
      flex: '1'
    }}>
      <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{count}</h2>
      <p style={{ fontSize: '1rem', margin: 0 }}>{label}</p>
    </div>
  );

  return (
    <>
      {(role === "student" || role === "lecturer" || role === "registrar") ? (
        <>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {role === 'student' && (
              <>
                <StatCard count={seen.length} label="Seen Issues" color="#4caf50" />
                <StatCard count={unseen.length} label="Unseen Issues" color="#f44336" />
                <StatCard count={resolved.length} label="Resolved Issues" color="#2196f3" />
              </>
            )}
            {role === 'lecturer' && (
              <>
                <StatCard count={assignedissues.length} label="Assigned Issues" color="#3f51b5" />
                <StatCard count={overdue.length} label="Overdue Issues" color="#e91e63" />
                <StatCard count={upcoming.length} label="Upcoming Deadlines" color="#ffc107" />
              </>
            )}
            {role === 'registrar' && (
              <>
                <StatCard count={seen.length} label="Seen Issues" color="#009688" />
                <StatCard count={unseen.length} label="Unseen Issues" color="#9c27b0" />
                <StatCard count={overdue.length} label="Overdue Issues" color="#f44336" />
              </>
            )}
          </div>

          {/* Motivational Quote */}
          <div style={{
            marginTop: '40px',
            fontSize: '1.8rem',
            fontWeight: '600',
            textAlign: 'center',
            color: '#333',
            maxWidth: '800px',
            marginInline: 'auto',
            fontStyle: 'italic'
          }}>
            “{quote}”
          </div>
        </>
      ) : (
        <h1>Sorry, an error has occurred on this page, please reload!</h1>
      )}
    </>
  );
};

export default Splash2;
