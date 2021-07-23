import React from 'react';
import {Redirect} from 'react-router-dom';
import {Link} from  'react-router-dom';

function MyPlants(props) {
    const {isLoggedIn} = props
    if (isLoggedIn === false) {
        return <Redirect to={'/login'} />
    }
    return (
        <div>
            Hello I'm all your plants
            <p> Login status: {isLoggedIn.toString()}</p>
            <Link to='/plants/create'>Add Plant</Link>
        </div>
    );
};

export default MyPlants;