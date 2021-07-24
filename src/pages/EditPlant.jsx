import React from 'react';
// import {Redirect} from 'react-router-dom';
import SideNav from '../components/SideNav';
import './PageLayout.css'

function EditPlant(props) {
    const {isLoggedIn, onLogOut} = props
    return (
        <>
            <SideNav onLogOut={onLogOut} />
            <div className='body-container'>
                <h1>Edit Plant</h1>
                <p> Login status: {isLoggedIn.toString()}</p>
            </div>
        </>
    );
};

export default EditPlant;