import React, { useState, useEffect } from 'react';
import './css/App.css';
import './css/homepage.css';
import './css/signup.css';
import './css/dashboard.css';
import './css/form.css';
import './css/styles.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from './components/HomePage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import StudentPage from './components/StudentPage';
import LecturerPage from "./components/LecturerPage";
import RegistrarPage from "./components/RegistrarPage";
import PasswordReset from './components/PasswordReset';

//https://accademic-issue-tracking-system.onrender.com http://127.0.0.1:8000

function App() {
  // Add event listener for media queries and edit buttons to render accordingly
  const [content, setContent] = useState('Splash2');
  const [id, setid] = useState(0)
  const [backend, setBackend] = useState("http://127.0.0.1:8000")
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('resize', handleResize);
    // Set initial state based on current size
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
        <Routes>
            <Route path='/' element={<Homepage backend={backend} />} />
            <Route path='/signup' element={<SignupPage backend={backend}/>} />
            <Route path='/login' element={<LoginPage backend={backend}/>} />
            <Route path='/student' element={<StudentPage content={content} setContent={setContent} backend={backend} isVisible={isVisible} setIsVisible={setIsVisible}/>} />
            <Route path='/registrar' element={<RegistrarPage  content={content} setContent={setContent} backend={backend} isVisible={isVisible} setIsVisible={setIsVisible}/>} />
            <Route path='/lecturer' element={<LecturerPage  content={content} setContent={setContent} id={id} setid={setid} backend={backend} isVisible={isVisible} setIsVisible={setIsVisible}/>} />
            <Route path='/reset' element={<PasswordReset backend={backend}/>} />
        </Routes>
    </Router>
  );
}

export default App;
