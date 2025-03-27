import React from 'react';
function SignupPage() {
    const signup = async () => {
        response = await axios.post()
    }
    return (
      <div>
          <h1>Enter credentials</h1>
          <form onSubmit={signup}>
            <input name="username" type="text"/>
            <input name="password" type="password"/>
            <button type="submit">Submit</button>
          </form>
      </div>
    );
  }

export default SignupPage;