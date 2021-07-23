import React from 'react';
import {Redirect} from 'react-router-dom';

function Profile(props) {
    const {isLoggedIn} = props
    if (isLoggedIn === false) {
        return <Redirect to={'/login'} />
    }
    return (
        <div>
            Hello I'm your profile page. view/update your details or delete your account
            <p> Login status: {isLoggedIn.toString()}</p>
        </div>
    );
};

export default Profile;