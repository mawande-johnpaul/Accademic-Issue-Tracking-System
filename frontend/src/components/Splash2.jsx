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
  const today = new Date();

  // Helper function to separate issues by status
  const categorizeIssues = (list) => {
    const seenIssues = [];
    const unseenIssues = [];
    const resolvedIssues = [];

    for (const issue of list) {
      if (issue.status === "Seen") seenIssues.push(issue);
      else if (issue.status === "Unseen") unseenIssues.push(issue);
      else if (issue.status === "Resolved") resolvedIssues.push(issue);
    }

    return { seenIssues, unseenIssues, resolvedIssues };
  };

  // Helper to classify overdue and upcoming from a list
  const categorizeDeadlines = (list) => {
    const overdueIssues = [];
    const upcomingIssues = [];

    for (const issue of list) {
      const deadline = new Date(issue.deadline);
      if (deadline < today && issue.status !== "Resolved") {
        overdueIssues.push(issue);
      } else {
        upcomingIssues.push(issue);
      }
    }
    return { overdueIssues, upcomingIssues };
  };

  let seenIssues = [];
  let unseenIssues = [];
  let resolvedIssues = [];
  let overdueIssues = [];
  let upcomingIssues = [];

  if (role === "student") {
    // Use main issues list for student
    const categorized = categorizeIssues(issues);
    seenIssues = categorized.seenIssues;
    unseenIssues = categorized.unseenIssues;
    resolvedIssues = categorized.resolvedIssues;
  } else if (role === "lecturer") {
    // Lecturer sees assigned + new issues for deadlines
    // Combine newissues and assignedissues for deadlines
    const combinedIssues = [...newissues, ...assignedissues];

    // Use assignedissues count for Assigned Issues card
    ({ overdueIssues, upcomingIssues } = categorizeDeadlines(combinedIssues));
  } else if (role === "registrar") {
    // Registrar uses main issues for seen/unseen and deadlines
    const categorized = categorizeIssues(issues);
    seenIssues = categorized.seenIssues;
    unseenIssues = categorized.unseenIssues;

    const { overdueIssues: regOverdue, upcomingIssues: regUpcoming } = categorizeDeadlines(issues);
    overdueIssues = regOverdue;
    upcomingIssues = regUpcoming;
  }

  const getRandomQuote = () => {
    let quotes;
    if (role === "student") quotes = studentQuotes;
    else if (role === "lecturer") quotes = lecturerQuotes;
    else if (role === "registrar") quotes = registrarQuotes;
    else quotes = ["Keep pushing — you're doing great!"];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  setSeen(seenIssues);
  setUnseen(unseenIssues);
  setResolved(resolvedIssues);
  setOverdue(overdueIssues);
  setUpcoming(upcomingIssues);
  setQuote(getRandomQuote());
}, []);

 const StatCard = ({ count, label, color, textColor }) => (
  <div
    style={{
      background: color,
      padding: "20px",
      borderRadius: "10px",
      margin: "10px",
      color: textColor || "#000", // default black text if not provided
      textAlign: "center",
      flex: "1",
      boxShadow: "0px 0px 5px 0px #808080",
    }}
  >
    <h2 style={{ fontSize: "2.5rem", margin: 0 }}>{count}</h2>
    <p style={{ fontSize: "1rem", margin: 0 }}>{label}</p>
  </div>
);

  return (
    <>
      {(role === "student" || role === "lecturer" || role === "registrar") ? (
        <>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {role === "student" && (
  <>
    <StatCard count={seen.length} label="Seen Issues" color="#e0f7fa" textColor="#00796b" />
    <StatCard count={unseen.length} label="Unseen Issues" color="#fff3e0" textColor="#ef6c00" />
    <StatCard count={resolved.length} label="Resolved Issues" color="#e8f5e9" textColor="#388e3c" />
  </>
)}

{role === "lecturer" && (
  <>
    <StatCard count={assignedissues.length} label="Assigned Issues" color="#bbdefb" textColor="#0d47a1" />
    <StatCard count={overdue.length} label="Overdue Issues" color="#ffcdd2" textColor="#b71c1c" />
    <StatCard count={upcoming.length} label="Upcoming Deadlines" color="#d1c4e9" textColor="#4a148c" />
  </>
)}

{role === "registrar" && (
  <>
    <StatCard count={seen.length} label="Seen Issues" color="#c8e6c9" textColor="#2e7d32" />
    <StatCard count={unseen.length} label="Unseen Issues" color="#ffe0b2" textColor="#ef6c00" />
    <StatCard count={overdue.length} label="Overdue Issues" color="#ffcdd2" textColor="#b71c1c" />
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
