import React from 'react';

// Components
import TopNav from './TopNav';
import SideNav from './SideNav';
import Footer from './Footer';

function Dashboard() {
    return (
        <div>
            <TopNav />
            <SideNav />
            Hello I'm the dashboard
            <Footer />
        </div>
    );
};

export default Dashboard;