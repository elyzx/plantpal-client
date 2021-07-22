import React from 'react';

 function SideNav() {
    return (
        <div>
            Hello I'm the side nav
            <a href="/dashboard">Dashboard</a>
            <a href="/plants">Plants</a>
            <a href="/plants/create">Add Plant</a>
        </div>
    );
};

export default SideNav;