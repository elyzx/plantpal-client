import React from 'react';
import {Redirect} from 'react-router-dom';

function AddPlant(props) {
    const {isLoggedIn} = props
    if (isLoggedIn === false) {
        return <Redirect to={'/login'} />
    }
    return (
        <div>
            Hello I'm the add plant form
            <p> Login status: {isLoggedIn.toString()}</p>
        </div>
    );
};

export default AddPlant;