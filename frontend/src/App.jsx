import React from 'react';
import './css/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from './components/HomePage';
import LoginPage from './components/SignupPage';
import SignupPage from './components/LoginPage';
  
function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
        </Routes>
    </Router>

  );
}

export default App;
