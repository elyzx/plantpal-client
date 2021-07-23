import React from 'react';

function LandingPage(props) {
    const {isLoggedIn} = props
    return (
        <div>
            Hello I'm the Landing Page
            <br />
            I provide info about the website and why it's awesome
            <br />
            <p> Login status: {isLoggedIn.toString()}</p>
        </div>
    );
};

export default LandingPage;