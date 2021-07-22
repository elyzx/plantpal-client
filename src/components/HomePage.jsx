import React from 'react';

function HomePage() {
    return (
        <div>
            Hello I'm the Homepage
            <br />
            I provide info about the website and why it's awesome
            <br />
            <a href='/signup'>Signup</a>
            <a href='/login'>Login</a>
            <a href='/dashboard'>Dashboard</a>
        </div>
    );
};

export default HomePage;