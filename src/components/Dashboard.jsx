import React from 'react';
import {Redirect} from 'react-router-dom';

function Dashboard(props) {
    const {isLoggedIn} = props
    if (isLoggedIn === false) {
        return <Redirect to={'/login'} />
    }
    return (
        <div>
            Hello I'm the dashboard
            <p> Login status: {isLoggedIn.toString()}</p>
        </div>
    );
};

export default Dashboard;