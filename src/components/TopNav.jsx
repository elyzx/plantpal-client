import React from 'react';
import {Link} from  'react-router-dom';
import './TopNav.css';

function TopNav(props) {
    return (
        <div id="topnav">
                <Link to="/login" id='loginButton'>Log In</Link>
				<Link to="/signup" id='signupButton'>Sign Up</Link>
        </div>
    );
};

export default TopNav;