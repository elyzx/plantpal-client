import React from 'react';
import SideNav from '../components/SideNav';
import {Redirect} from 'react-router-dom';
import './PageLayout.css'

function Dashboard(props) {
    const {isLoggedIn, onLogOut} = props
    return (
        <>
            <SideNav onLogOut={onLogOut} />
            <div className='body-container'>
                <h1>Dashboard</h1>
                <p> Login status: {isLoggedIn.toString()}</p>
            </div>
        </>
    );
};

export default Dashboard;