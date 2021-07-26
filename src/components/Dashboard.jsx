import React from 'react';

// Material UI
import Container from '@material-ui/core/Container';

function Dashboard(props) {
    const {isLoggedIn} = props
    return (
        <Container>
            <div>
                <h1>Dashboard</h1>
                <p> Login status: {isLoggedIn.toString()}</p>
            </div>
        </ Container>
    );
};

export default Dashboard;