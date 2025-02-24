import React from 'react';
import { Link } from 'react-router-dom';
function HomePage() {
    return (
        <div>
            <h1>Welcome to AITS</h1>
            <Link to='/login' button>Log in</Link>
            <Link to='/signup' button>Sign up</Link>
        </div>
    );
}

export default HomePage;