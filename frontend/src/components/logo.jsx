import React from 'react';

const Logo = () => {
    return (
        <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="Logo" />
    );
};

export default Logo;