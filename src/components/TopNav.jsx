import React from 'react';

function TopNav() {
    return (
        <div>
            Hello I'm the top nav.
            If a user is not logged on, I'll show:
            <a href="/">Homepage</a>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
            If a user is logged in, I'll show:
            <a href="/profile">Profile</a>
            {/* button for sign out */}
        </div>
    );
};

export default TopNav;