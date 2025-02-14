import React from 'react';

const Logo = () => {
    return (
        <div>
            <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="Logo" />
        </div>
        
    );
};

export default Logo;