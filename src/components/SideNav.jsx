import React from 'react';
import {Link} from  'react-router-dom';

 function SideNav(props) {
    return (
        <div>
            Hello I'm the side nav
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/plants'>Plants</Link>
            <Link to='/plants/create'>Add Plant</Link>
            <Link to='/profile'>Profile</Link>
        </div>
    );
};

export default SideNav;