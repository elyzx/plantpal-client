import React from 'react';
import {Redirect} from 'react-router-dom';

function Dashboard(props) {
    const {isLoggedIn} = props
    if (isLoggedIn === false) {
        return <Redirect to={'/login'} />
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <p> Login status: {isLoggedIn.toString()}</p>
        </div>
    );
};

export default Dashboard;