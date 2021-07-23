import React from 'react';
import {Redirect} from 'react-router-dom';

// Components
import SideNav from '../components/SideNav';

function EditPlant(props) {
    const {isLoggedIn} = props
    if (isLoggedIn === false) {
        return <Redirect to={'/login'} />
    }
    return (
        <div>
            <SideNav />
            Hello I'm the edit plant form
            <p> Login status: {isLoggedIn.toString()}</p>
        </div>
    );
};

export default EditPlant;