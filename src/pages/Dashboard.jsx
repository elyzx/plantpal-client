import React from 'react';
import './PageLayout.css';


function Dashboard(props) {
    const {isLoggedIn} = props
    return (
        <>
            <div className='body-container'>
                <h1>Dashboard</h1>
                <p> Login status: {isLoggedIn.toString()}</p>
            </div>
        </>
    );
};

export default Dashboard;