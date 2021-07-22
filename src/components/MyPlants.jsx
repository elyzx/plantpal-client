import React from 'react';

// Components
import TopNav from './TopNav';
import SideNav from './SideNav';
import Footer from './Footer';

function MyPlants() {
    return (
        <div>
            <TopNav />
            <SideNav />
            Hello I'm all your plants
            <a href="/plants/create">Add Plant</a>
            <Footer />
        </div>
    );
};

export default MyPlants;