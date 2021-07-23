import React from 'react';
import {Link} from  'react-router-dom';

function TopNav(props) {
    return (
        <div>
            Hello I'm the top nav.
            If a user is not logged on, I'll show:
            <Link to='/'>Homepage</Link>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
            <button onClick={props.onLogOut}>Logout</button>
        </div>
    );
};

export default TopNav;