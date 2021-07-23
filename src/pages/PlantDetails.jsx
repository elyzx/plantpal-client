// Setup
import React from 'react';
import {Redirect} from 'react-router-dom';
import SideNav from '../components/SideNav';
import './PageLayout.css'

function PlantDetails(props) {
    const {isLoggedIn, onLogOut} = props
    if (isLoggedIn === false) {
        return <Redirect to={'/login'} />
    }
    return (
        <>
            <SideNav onLogOut={onLogOut} />
            <div className='body-container'>
                <h1>Plant Details</h1>
                <p> Login status: {isLoggedIn.toString()}</p>
            </div>
        </>
    );
};

export default PlantDetails;