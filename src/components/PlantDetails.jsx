import React from 'react';

// Components
import TopNav from './TopNav';
import SideNav from './SideNav';
import Footer from './Footer';

function PlantDetails() {
    return (
        <div>
            <TopNav />
            <SideNav />
            Hello I'm the plant details
            <Footer />
        </div>
    );
};

export default PlantDetails;