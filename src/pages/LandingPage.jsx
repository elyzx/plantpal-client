// Setup
import React from 'react';

function LandingPage(props) {
    const {isLoggedIn} = props
    return (
        <div>
            <h1>Health tracking for houseplants</h1>
            <p>With PlantPal, caring for your houseplants has never been easier. Keep track of your plants and their care needs, so you never forget to water them again!</p>
            <p> Login status: {isLoggedIn.toString()}</p>
        </div>
    );
};

export default LandingPage;