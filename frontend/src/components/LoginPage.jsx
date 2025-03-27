import axios from 'axios';
import React from 'react';

function LoginPage() {
    const login = () => {
        const username = document.getElementById('username')
        const password = document.getElementById('password')
        const password2 = document.getElementById('password2')
        const response = async() => {
          await axios.post('http://127.0.0.1:8000/api/login', {username, password, password2})
          }
        alert(response)
    }
    return (
      <div>
          <h1>Log in</h1>
          <form>
            <p>Username</p>
            <input 
                id="username" 
                type="text" 
            />
            <p>Password</p>
            <input id="password" type="password"/>
            <p>Password again</p>
            <input id="password2" type="password"/>
            <button type="submit" onClick={login}>Submit</button>
          </form>
      </div>
    );
  }

export default LoginPage;