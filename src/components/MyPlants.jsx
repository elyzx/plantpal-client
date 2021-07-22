import React from 'react';

// Components
import SideNav from './SideNav';
import Footer from './Footer';

function MyPlants() {
    return (
        <div>
            <SideNav />
            Hello I'm all your plants
            <a href="/plants/create">Add Plant</a>
            <Footer />
        </div>
    );
};

export default MyPlants;