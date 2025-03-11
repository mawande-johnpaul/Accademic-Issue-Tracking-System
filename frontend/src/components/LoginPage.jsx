import axios from 'axios';
import React, { useState } from 'react';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const login = async (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page

        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', data={ username, password });
            setMessage(`Login successful! Access token: ${response.data.access}`);
            console.log(response.data); // Handle the response data as needed
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
        <div>
            <h1>Log in</h1>
            <form onSubmit={login}>
                <p>Username</p>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <p>Password</p>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default LoginPage;