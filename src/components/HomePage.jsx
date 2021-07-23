import React from 'react';

function HomePage(props) {
    const {isLoggedIn} = props
    return (
        <div>
            Hello I'm the Homepage
            <br />
            I provide info about the website and why it's awesome
            <br />
            <p> Login status: {isLoggedIn.toString()}</p>
        </div>
    );
};

export default HomePage;