// Setup
import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import SideNav from '../components/SideNav';
import './PageLayout.css'

function MyPlants(props) {
    const {isLoggedIn, onLogOut, user} = props
    if (!user) {
        return <Redirect to={'/login'} />
    }
    return (
        <> 
            <SideNav onLogOut={onLogOut} />
            <div className='body-container'>
                <h1>My Plants</h1>
                <Link to="/plants/create" className="blue-button">Add Plant</Link>
                <p> Login status: {isLoggedIn.toString()}</p>
            </div>
        </>
    );
};

export default MyPlants;