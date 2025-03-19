import React, { useState } from 'react';
import axios from 'axios';

function SignupPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');

    const signup = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/', { username, password, email, role, department });
        setMessage('Signup Succesful!')
        setUsername('');
        setPassword('');
        setEmail('');
        setRole('');
        setDepartment('');      
    } catch (error) {
      setMessage('Signup failed! Please try again.');
      console.error('Signup error:',error);
    }

    return (
      <div>
          <h1>Enter credentials</h1>
          <form onSubmit={signup}>
            <p>Username</p>
            <input type="text"                     
              value={username} 
              onChange={(e) => setUsername(e.target.value)} />
            <p>Email</p>
            <input type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} />
            <p>Password</p>
            <input type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} />
            <p>Role</p>
            <input type="text"
              value={role} 
              onChange={(e) => setRole(e.target.value)} />
            <p>Department</p>
            <input type="text"
              value={department} 
              onChange={(e) => setDepartment(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
      </div>
    );
  }

export default SignupPage;