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
import Reminders from './pages/Reminders';
import Page404 from './pages/Page404';

// It begins!
function App(props) {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [plants, updatePlants] = useState([]);
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        fetchUser();
        if (isLoggedIn) {
            fetchPlants();
            fetchReminders();
        }
    }, [isLoggedIn]); 

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
            let response = await axios.get(`http://localhost:5005/api/plants`, {withCredentials: true});
            updatePlants(response.data);
        }
        catch (err) {
            console.log('plants fetch failed', err)
        };
    };

    const fetchReminders = async () => {
        try {
            let response = await axios.get(`http://localhost:5005/api/reminders`, {withCredentials: true})
            console.log('in the fetchreminders function', response.data)
            setReminders(response.data)
        }
        catch (err) {
            console.log('reminders fetch failed', err)
        }
    }
  
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

        let formData = new FormData()
        formData.append('imageUrl', event.target.photo.files[0])

        let imgResponse = await axios.post('http://localhost:5005/api/upload', formData)

        const { name, description, waterFreq, fertiliseFreq} = event.target;
        let newPlant = {
            name: name.value,
            description: description.value,
            waterFreq: waterFreq.value,
            fertiliseFreq: fertiliseFreq.value,
            photo: imgResponse.data.photo
        }
        try {
            let response = await axios.post('http://localhost:5005/api/plants/create', newPlant , {withCredentials: true});
            newPlant = response.data
            updatePlants([newPlant, ...plants])
            props.history.push('/plants');
        }
        catch (err) {
            console.log('create plant failed', err);
        };
    };

    const handleDeletePlant = async (plantId) => {
        try{
            axios.delete(`http://localhost:5005/api/plants/${plantId}`, {withCredentials: true})
            let filteredPlants = plants.filter((plant) => {
                return plant._id !== plantId
            })
            updatePlants(filteredPlants)
            props.history.push('/plants');
        }
        catch(err){
            console.log('delete plant failed', err)
        }
    }

    const handleEditPlant = async (event, plant) => {
        event.preventDefault()
        try{
            await axios.patch(`http://localhost:5005/api/plants/${plant._id}`, plant, {withCredentials: true})
            let updatePlant = plants.map((singleplant) => {
                if (singleplant._id === plant._id){
                    singleplant.name = plant.name
                    singleplant.description = plant.description
                    singleplant.waterFreq = plant.waterFreq
                    singleplant.fertiliseFreq = plant.fertiliseFreq
                    singleplant.isAlive = plant.isAlive
                }
                return singleplant
            })
            updatePlants(updatePlant)
            props.history.push('/plants');
            
        }
        catch(err){
            console.log('edit plant fetch failed', err)
        }
    }

    // const handleEditUser = async (event, user) => {
    //     event.preventDefault()
    //     try{
    //         await axios.patch(`http://localhost:5005/api/profile`, user)
    //         let updateUser = user.map((singleUser) => {
    //             if (singleUser._id === user._id){
    //             singleUser.name = user.name
    //             singleUser.username = user.username
    //             singleUser.email = user.email
    //             singleUser.password = user.password
    //             }

    //             return singleUser
    //         })
    //         setUser(updateUser)
    //         props.history.push('/');
    //     }
    //     catch(err){
    //         console.log('edit user fetch failed', err)
    //     }
    // }

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
                    return <Profile onDeleteUser={handleDeleteUser} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/dashboard'} render={(routeProps) => {
                    return <Dashboard isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/plants'} render={(routeProps) => {
                    return <MyPlants plants={plants} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route path={'/plants/create'} render={(routeProps) => {
                    return <AddPlant onAddPlant={handleAddPlant} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/plants/:plantId'} render={(routeProps) => {
                    return <PlantDetails onDelete={handleDeletePlant} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route path={'/plants/:plantId/edit'} render={(routeProps) => {
                    return <EditPlant onEdit={handleEditPlant} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/reminders'} render={(routeProps) => {
                    return <Reminders reminders={reminders }isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                {/* Page Not Found */}
                <Route component={Page404} />
            </Switch>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default withRouter(App);
