// Setup
import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import './Plants.css'

function MyPlants(props) {
    const {isLoggedIn} = props
    if (isLoggedIn === false) {
        return <Redirect to={'/login'} />
    }
    return (
        <div> 
            <h1>My Plants</h1>
            <Link to="/plants/create" className="plant-button">Add Plant</Link>
            <p> Login status: {isLoggedIn.toString()}</p>
        </div>
    );
};

export default MyPlants;