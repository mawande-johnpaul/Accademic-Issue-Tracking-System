import React from 'react';
function SignupPage() {
    const signup = async () => {
        response = await axios.post('http://127.0.0.1:8000/', )
    }
    return (
      <div>
          <h1>Enter credentials</h1>
          <form onSubmit={signup}>
            <p>Username</p>
            <input name="username" type="text"/>
            <p>Email</p>
            <input name="email" type="email"/>
            <p>Password</p>
            <input name="password" type="password"/>
            <p>Role</p>
            <input name="role" type="text"/>
            <p>Department</p>
            <input name="department" type="text"/>
            <button type="submit">Submit</button>
          </form>
      </div>
    );
  }

export default SignupPage;