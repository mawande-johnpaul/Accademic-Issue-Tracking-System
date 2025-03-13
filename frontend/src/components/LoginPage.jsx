import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const login = async (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page

        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', { username, password });
            localStorage.setItem('token', response.data.access_token); // Store the token in the browser
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Store the user data in the browser
            navigate("/student"); // Redirect to dashboard
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
            <h1 className='h1'>Log in</h1>
            <form onSubmit={login} className='signuplower'>
                <div className='row'>
                    <div className='labels'>Username</div>
                    <input 
                        className='inputs'
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>

                <div className='row'>
                    <div className='labels'>Password</div>
                    <input 
                        className='inputs'
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>

                <button type="submit" className='buttons'>Submit</button>
            </form>
            {message && <div>{message}</div>}
        </div>
    );
}

export default LoginPage;