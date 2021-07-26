import React from 'react';

// Material UI
import Container from '@material-ui/core/Container';

function LandingPage(props) {
    const {isLoggedIn} = props
    return (
        <Container>
            <h1>Health tracking for houseplants</h1>
            <p>With PlantPal, caring for your houseplants has never been easier. Keep track of your plants and their care needs, so you never forget to water them again!</p>
            <p> Login status: {isLoggedIn.toString()}</p>
        </ Container>
    );
};

export default LandingPage;