import axios from 'axios';
import React, { useState } from 'react';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const login = async (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/',{ username, password });
            console.log(response);
        } catch (error) {
            console.log(error);
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
        </div>
    );
}

export default LoginPage;