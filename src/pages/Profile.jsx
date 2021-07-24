import React, { useState, useEffect } from 'react';
// import {Redirect} from 'react-router-dom';
import './auth/AuthPageLayout.css';
import './PageLayout.css'
import SideNav from '../components/SideNav';
import axios from 'axios';

function Profile(props) {
    const {isLoggedIn, onLogOut} = props
    const [profileDetails, setProfileDetails] = useState({});

    useEffect(() => {
        fetchProfileDetails();
    }, []);
    
    const fetchProfileDetails = async () => {
        try {
            let response = await axios.get(`http://localhost:5005/api/profile`, {withCredentials: true});
            setProfileDetails(response.data)
        }
        catch (err) {
            console.log('Profile details fetch failed', err)
        }
    }

    return (
        <>
            <SideNav onLogOut={onLogOut} />
            <div className='body-container'>
                <h1>Profile Details</h1>
                <p>Login status: {isLoggedIn.toString()}</p>
                <p>Name: {profileDetails.name}</p>
                <p>Username: {profileDetails.username}</p>
                <p>Email: {profileDetails.email}</p>
            </div>
        </>
    );
};

export default Profile;