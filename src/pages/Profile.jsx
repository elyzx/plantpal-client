import React from 'react';
import './auth/AuthPageLayout.css';
import './PageLayout.css'
import SideNav from '../components/SideNav';

function Profile(props) {
    const {isLoggedIn, onLogOut} = props
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