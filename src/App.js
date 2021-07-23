import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import axios from 'axios';

// Components
import LandingPage from './pages/LandingPage';
import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import MyPlants from './pages/MyPlants';
import AddPlant from './pages/AddPlant';
import PlantDetails from './pages/PlantDetails';
import EditPlant from './pages/EditPlant';
import Page404 from './pages/Page404';
import Footer from './components/Footer';

function App(props) {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [plants, updatePlants] = useState([]);

    useEffect(() => {
        fetchUser()
    }, []);

    const fetchUser = async () => {
        try {
            let response = await axios.get('http://localhost:5005/api/user', {withCredentials: true});
            setUser(response.data);
        }
        catch (err) {
            console.log('User not logged in', err);
        };
    };
  
    const handleSignUp = async (event) => {
        event.preventDefault();
        const {name, username, email, password} = event.target;
        let newUser = {
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value,
        };
        try {
            await axios.post('http://localhost:5005/api/signup', newUser, {withCredentials: true});
            props.history.push('/login');
        }
        catch (err) {
            console.log('Signup failed', err);
        };
    };

    const handleLogIn = async (event) => {
        event.preventDefault();
        const {username, password} = event.target;
        let myUser = {
            username: username.value,
            password: password.value,
        };
        try {
            let response = await axios.post('http://localhost:5005/api/login', myUser, {withCredentials: true});
            setUser(response.data);
            setIsLoggedIn(true);
            props.history.push('/dashboard');
        }
        catch (err) {
            console.log('Login failed', err);
        };
    };

    const handleLogOut = async () => {
        try {
            await axios.post(`http://localhost:5005/api/logout`, {}, {withCredentials: true});
            setUser(null);
            setIsLoggedIn(false);
            props.history.push('/');
        }
        catch (err) {
            console.log('Logout failed', err);
        };
    };

    const handleAddPlant = async (event) => {
        event.preventDefault();
        const { name, description, waterFreq, fertiliseFreq} = event.target;
        let newPlant = {
            name: name.value,
            description: description.value,
            waterFreq: waterFreq.value,
            fertiliseFreq: fertiliseFreq.value,
        }
        try {
            await axios.post('http://localhost:5005/api/plants/create', newPlant );
            updatePlants([newPlant, ...plants])
        }
        catch (err) {
            console.log('create plant failed', err);
        };
    };

    return (
        <div className="App">
            {/* Navbar */}
            <TopNav onLogOut={handleLogOut} isLoggedIn={isLoggedIn} />
            <SideNav isLoggedIn={isLoggedIn}/>
            {/* Pages */}
            <Switch>
                {/* Public Pages */}
                <Route exact path={'/'} render={(routeProps) => {
                    return <LandingPage user={user} isLoggedIn={isLoggedIn} {...routeProps} />
                }} />
                <Route path={'/signup'} render={(routeProps) => {
                    return <Signup onSignUp={handleSignUp} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route path={'/login'} render={(routeProps) => {
                    return <Login onLogIn={handleLogIn} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                {/* Protected Pages */}
                <Route exact path={'/profile'} render={(routeProps) => {
                    return <Profile user={user} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/dashboard'} render={(routeProps) => {
                    return <Dashboard user={user} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/plants'} render={(routeProps) => {
                    return <MyPlants user={user} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route path={'/plants/create'} render={(routeProps) => {
                    return <AddPlant onAddPlant={handleAddPlant} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/plants/:plantId'} render={(routeProps) => {
                    return <PlantDetails user={user} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route path={'/plants/:plantId/edit'} render={(routeProps) => {
                    return <EditPlant user={user} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                {/* Page Not Found */}
                <Route component={Page404} />
            </Switch>
            <Footer />
        </div>
    );
}

export default withRouter(App);
