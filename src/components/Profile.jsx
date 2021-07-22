import React from 'react';

// Components
import TopNav from './TopNav';
import SideNav from './SideNav';
import Footer from './Footer';

function Profile() {
    return (
        <div>
            <TopNav />
            <SideNav />
            Hello I'm your profile page. view/update your details or delete your account
            <Footer />
        </div>
    );
};

export default Profile;