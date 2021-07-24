import React from 'react';
import {Redirect} from 'react-router-dom';
import './auth/AuthPageLayout.css';
import './PageLayout.css'
import SideNav from '../components/SideNav';

function Profile(props) {
    const {isLoggedIn, onLogOut, user} = props
    if (!user) {
        return <Redirect to={'/login'} />
    }
    return (
        <>
            <SideNav onLogOut={onLogOut}/>
            <div className='body-container'>
                <h1>Profile Details</h1>
                <p> Login status: {isLoggedIn.toString()}</p>
            </div>
        </>
    );
};

export default Profile;