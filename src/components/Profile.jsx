import React from 'react';

// Components
import SideNav from './SideNav';
import Footer from './Footer';

function Profile() {
    return (
        <div>
            <SideNav />
            Hello I'm your profile page. view/update your details or delete your account
            <Footer />
        </div>
    );
};

export default Profile;