import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const navigate = useNavigate();

    const signup = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/signup/', { username, password, email, role, department });
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate("/student");
        
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
              <div className='labels'>Password</div>
              <input type="password" className='inputs'
                value={password} 
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='row'>
              <div className='labels'>Role</div>
              <input type="text" className='inputs'
                value={role} 
                onChange={(e) => setRole(e.target.value)} />
            </div>
            <div className='row'>
              <div className='labels'>Department</div>
              <input type="text" className='inputs'
                value={department} 
                onChange={(e) => setDepartment(e.target.value)} />
            </div>
            <button type="submit" className='buttons'>Submit</button>
          </form>
          {message && <div>{message}</div>}
      </div>
    );
  }

export default SignupPage;