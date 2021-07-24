// Setup
import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import axios from 'axios';
import './App.css';

// Components
import TopNav from './components/Nav';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import MyPlants from './pages/MyPlants';
import AddPlant from './pages/AddPlant';
import PlantDetails from './pages/PlantDetails';
import EditPlant from './pages/EditPlant';
import Page404 from './pages/Page404';

// It begins!
function App(props) {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [plants, updatePlants] = useState([]);

    useEffect(() => {
        fetchUser();
        fetchPlants();
    }, []); 

    const fetchUser = async () => {
        try {
            let response = await axios.get('http://localhost:5005/api/user', {withCredentials: true});
            setUser(response.data);
            setIsLoggedIn(true);
        }
        catch (err) {
            console.log('User not logged in', err);
            setIsLoggedIn(false);
        };
    };

    const fetchPlants = async () => {
        try {
            let response = await axios.get(`http://localhost:5005/api/plants`);
            updatePlants(response.data);
        }
        catch (err) {
            console.log('plants fetch failed', err)
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
            console.log(response.data)
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

    const handleDeleteUser = async (user) => {
        try {
            await axios.delete('http://localhost:5005/api/profile', {withCredentials: true});
            setUser(null);
            setIsLoggedIn(false);
            props.history.push('/');
        }
        catch (err) {
            console.log('Deleting account failed', err);
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
            let response = await axios.post('http://localhost:5005/api/plants/create', newPlant );
            newPlant = response.data
            updatePlants([newPlant, ...plants])
            props.history.push('/plants');
        }
        catch (err) {
            console.log('create plant failed', err);
        };
    };

    return (
        <div className="App">
            {/* Navbar */}
            <TopNav onLogOut={handleLogOut} isLoggedIn={isLoggedIn} />
            <div className='container'>
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
                <Route path={'/profile'} render={(routeProps) => {
                    return <Profile onLogOut={handleLogOut} onDeleteUser={handleDeleteUser} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/dashboard'} render={(routeProps) => {
                    return <Dashboard onLogOut={handleLogOut} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/plants'} render={(routeProps) => {
                    return <MyPlants onLogOut={handleLogOut} plants={plants} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route path={'/plants/create'} render={(routeProps) => {
                    return <AddPlant onLogOut={handleLogOut} onAddPlant={handleAddPlant} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/plants/:plantId'} render={(routeProps) => {
                    return <PlantDetails onLogOut={handleLogOut} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route path={'/plants/:plantId/edit'} render={(routeProps) => {
                    return <EditPlant onLogOut={handleLogOut} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                {/* Page Not Found */}
                <Route component={Page404} />
            </Switch>
            </div>
            <Footer />
        </div>
    );
};

export default withRouter(App);
