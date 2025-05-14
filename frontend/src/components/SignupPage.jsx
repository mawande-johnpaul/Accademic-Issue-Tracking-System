import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {

    const COLLEGES = {'COCIS': ['BSCS', 'BSEE', 'BLIS', 'BIST'],
                      'COBAMS': ['BSBA', 'BSCOMM', 'BSECON'],
                      'CONAS': ['BSN', 'BSHRM', 'BSED']}
    
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [webmail, setWebmail] = useState('');
    const [course, setCourse] = useState('Select a course first');
    const [department, setDepartment] = useState('');
    const [verificationPending, setVerificationPending] = useState(false);

    const navigate = useNavigate();

    const signup = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/signup/', { first_name, last_name, username, password, email, webmail, department, course });
        sessionStorage.setItem('token', response.data.token); // Fixed key for token
        sessionStorage.setItem('user', JSON.stringify(response.data.user));

        setMessage('Signup successful! Please verify your email and then click "Verify Email" above.');
        setVerificationPending(true);

      } catch (error) {
        setMessage('Signup failed. Invalid credentials!');
        console.error(error);
      }
    };

    const verifyEmail = async () => {
      const userString = sessionStorage.getItem('user');
    
      if (!userString) {
        console.error("No user found in session storage.");
        setMessage("User not found. Please sign up again.");
        return;
      }
    
      const user = JSON.parse(userString);
    
      if (!user || !user.id) {
        console.error("Invalid user object:", user);
        setMessage("Invalid user data. Please sign up again.");
        return;
      }
    
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/user/${user.id}/` // Ensure the endpoint matches the backend
        );
        const updatedUser = response.data;
    
        if (updatedUser.is_email_verified) {
          sessionStorage.setItem('user', JSON.stringify(updatedUser));
          setMessage('Email verified successfully! Redirecting...');
    
          if (updatedUser.role === "lecturer") {
            navigate("/lecturer");
          } else if (updatedUser.role === "registrar") {
            navigate("/registrar");
          } else {
            navigate("/student");
          }
        } else {
          setMessage('Email is not verified yet. Please check your inbox or spam folder.');
        }
      } catch (error) {
        console.error('Error checking verification:', error);
        setMessage('An error occurred while checking verification.');
      }
    };
    
    

    return (
      <div className='homepage'>
        <img src='banner2.jpeg' alt='banner2'></img>
          <h1 className='h1'>Create your free AITS account</h1>
          <form onSubmit={signup} className='congested-signuplower'>
            <div className='lower'>
                <div className='row'>
                  <input type="text" className='inputs' name='first_name'
                    value={first_name}
                    placeholder='First name.'
                    required
                    onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className='row'>
                  <input type="text" className='inputs' name='last_name'
                    value={last_name}
                    required
                    placeholder='Last name.'
                    onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className='row'>
                  <input type="text"  className='inputs'                   
                    value={username} 
                    placeholder='Username.'
                    required
                    onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='row'>
                  <input type="email" className='inputs'
                    value={email} 
                    placeholder='Email'
                    required
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <div className='lower'>
              <div className='row'>
                <input type="text" className='inputs'
                  value={webmail} 
                  required
                  placeholder='Webmail e.g. xxxxxxx.mak.ac.ug'
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.includes('mak.ac.ug')) {
                      setWebmail(value);
                      setMessage(''); // Clear any previous error message
                    } else {
                      setWebmail(value);
                      setMessage('Webmail must contain "mak.ac.ug".');
                    }
                  }} />
              </div>
              <div className='row'>
                <input type="password" className='inputs'
                  value={password} 
                  placeholder='Password.'
                  required
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className='row'>
                <select type="text" className='inputs'
                  value={department} 
                  required
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    setCourse('Select a course first'); // Reset course when department changes
                  }}>
                  <option value="">Select a college</option>
                  {Object.keys(COLLEGES).map((college, index) => (
                    <option key={index} value={college}>{college}</option>
                  ))}
                </select>
              </div>
              <div className='row'>
                <select type="text" className='inputs' choices={COLLEGES[department]}
                  value={course} 
                  required
                  onChange={(e) => setCourse(e.target.value)}>
                  <option value="Select a course first">Select a course first</option>
                  {COLLEGES[department] && COLLEGES[department].map((course, index) => (
                    <option key={index} value={course}>{course}</option>
                  ))}
                </select> 
              </div>
            </div>
          </form>
          {verificationPending ? (
            <div className='choicearea'>
              <button className='buttons' style={{ marginTop: '10px' }} onClick={verifyEmail}>
                Verify Email
              </button>
            </div>
          ) : (
            <div className='choicearea'>
              <button type="submit" className='buttons' style={{margin:"auto"}} onClick={() => signup(event)}>Signup</button>
            </div>
          )}
          <Link to='/login'>Already have an account?</Link>
          {message && <div style={{color:"red"}}>{message}</div>}
      </div>
    );
  }

export default SignupPage;