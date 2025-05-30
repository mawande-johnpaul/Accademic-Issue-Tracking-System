import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// LoginPage handles user login and role-based navigation
function LoginPage({backend}) {
    // State variables for form input and feedback
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
    const navigate = useNavigate();   // For redirecting based on user role

    const login = async (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page

        // Check for empty fields
        if (!username || !password) {
            setMessage('Username and password are required.');
            return;
        }

        setIsSubmitting(true); // Disable the submit button

        try {
            const response = await axios.post(`${backend}/login/`, { username, password });
            sessionStorage.setItem('token', response.data.access_token); // Store the token in the browser
            sessionStorage.setItem('user', JSON.stringify(response.data.user)); // Store the user data in the browser
            console.log(response.data.user);
            if (response.data.user.role === "lecturer") {
                navigate("/lecturer");
              } else if (response.data.user.role === "registrar") {
                navigate("/registrar");
              } else if (response.data.user.role === "student"){
                navigate("/student");
              }
              else{
                setMessage('An error occured. Please contact support.');
              }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(`Oops! ${error.response.data.detail}`);
            } else {
                setMessage('Invalid credentials. Please try again.');
            }
            console.error(error);
        } finally {
            setIsSubmitting(false); // Re-enable the submit button
        }
    };

    return (
        <div className='homepage'>
            <img src='banner2.jpg' alt='banner' className='banner'></img>
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
                <button type="submit" className='buttons' style={{margin:"auto"}} disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Log in'}
                </button>
                </div>
                <Link to='/signup'>Don't have an account?</Link>
                <Link to='/reset'>Forgot username or password?</Link>
            </form>
            {message && <div>{message}</div>}
        </div>
    );
}

export default LoginPage;
