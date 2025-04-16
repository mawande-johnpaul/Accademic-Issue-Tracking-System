import React from 'react';
import './css/App.css';
import './css/homepage.css';
import './css/signup.css';
import './css/dashboard.css';
import './css/form.css'
import './css/loadingscreen.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from './components/HomePage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import StudentPage from './components/StudentPage';
import LecturerPage from './components/LecturerPage';
import RegistrarPage from "./components/RegistrarPage";
  
function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/student' element={<StudentPage />} />
            <Route path='/registrar' element={<RegistrarPage />} />
            <Route path='/lecturer' element={<LecturerPage />} />
        </Routes>
    </Router>
  );
}

export default App;
