import React from 'react';
import {Redirect} from 'react-router-dom';
import './Auth.css';

function Profile(props) {
    const {isLoggedIn} = props
    if (isLoggedIn === false) {
        return <Redirect to={'/login'} />
    }
    return (
        <div className='auth-page'>
            <h1>Profile Details</h1>
            <p> Login status: {isLoggedIn.toString()}</p>
        </div>
    );
};

export default Profile;