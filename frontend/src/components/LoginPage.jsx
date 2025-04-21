import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const login = async (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page

        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', { username, password });
            sessionStorage.setItem('token', response.data.access_token); // Store the token in the browser
            sessionStorage.setItem('user', JSON.stringify(response.data.user)); // Store the user data in the browser
            if (response.data.user.role === "lecturer") {
                navigate("/lecturer");
              } else if (response.data.user.role === "registrar") {
                navigate("/registrar");
              } else {
                navigate("/student");
              }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(`Login failed: ${error.response.data.detail}`);
            } else {
                setMessage('Login failed. Please check your credentials.');
            }
            console.error(error);
        }
    };

    return (
        <div className='homepage'>
            <img src='banner2.jpeg' alt='banner' className='banner'></img>
            <form onSubmit={login} className='signuplower'>
                <h1 className='h1'>Log into your AITS account</h1>
                <div className='row'>
                    <input 
                        className='inputs'
                        type="text" 
                        value={username} 
                        placeholder='Username'
                        required
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>

                <div className='row'>
                    <input 
                        className='inputs'
                        type="password" 
                        value={password} 
                        placeholder='Password..'
                        required
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className='choicearea'>
                <button type="submit" className='buttons' style={{margin:"auto"}}>Log in</button>
                </div>
                <Link to='/signup'>Don't have an account?</Link>
                <Link to='/signup'>Forgot password?</Link>
            </form>
            {message && <div>{message}</div>}
        </div>
    );
}

export default LoginPage;