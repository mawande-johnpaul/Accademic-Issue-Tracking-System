import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {

    const COLLEGES = {'COCIS': ['BSCS', 'BSEE', 'BLIS', 'BIST'],
                      'COBAMS': ['BSBA', 'BSCOMM', 'BSECON'],
                      'CONAS': ['BSN', 'BSHRM', 'BSED']}
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [webmail, setWebmail] = useState('');
    const [course, setCourse] = useState('');
    const [department, setDepartment] = useState('');
    const navigate = useNavigate();

    const signup = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/signup/', { username, password, email, webmail, department, course });
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        if (response.data.user.role === "lecturer") {
          navigate("/lecturer");
        } else if (response.data.user.role === "registrar") {
          navigate("/registrar");
        } else {
          navigate("/student");
        }
        
      } catch (error) {
        setMessage('Signup failed. Please try again.');
        console.error(error);
      }
    }

    return (
      <div className='homepage'>
          <h1 className='h1'>Sign up</h1>
          <form onSubmit={signup} className='signuplower'>
            <div className='row'>
              <div className='labels'>First name</div>
              <input type="text" className='inputs'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className='row'>
              <div className='labels'>Last name</div>
              <input type="text" className='inputs'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className='row'>
              <div className='labels'>Username</div>
              <input type="text"  className='inputs'                   
                value={username} 
                onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className='row'>
              <div className='labels'>Email</div>
              <input type="email" className='inputs'
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='row'>
              <div className='labels'>Webmail</div>
              <input type="text" className='inputs'
                value={webmail} 
                placeholder='xxxxxxx.mak.ac.ug'
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
              <div className='labels'>Password</div>
              <input type="password" className='inputs'
                value={password} 
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='row'>
              <div className='labels'>College</div>
              <input type="text" className='inputs' choices={Object.keys(COLLEGES)}
                value={department} 
                onChange={(e) => setDepartment(e.target.value)} />
            </div>
            <div className='row'>
              <div className='labels'>Course</div>
              <input type="text" className='inputs' choices={COLLEGES[department]}
                value={course} 
                onChange={(e) => setCourse(e.target.value)} />
            </div>
            <button type="submit" className='buttons'>Submit</button>
          </form>
          {message && <div style={{color:"red"}}>{message}</div>}
      </div>
    );
  }

export default SignupPage;