// Setup
import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import axios from 'axios';
import './App.css';

// Components
import Nav from './components/Nav';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import MyPlants from './components/MyPlants';
import AddPlant from './components/AddPlant';
import PlantDetails from './components/PlantDetails';
import EditPlant from './components/EditPlant';
import Reminders from './components/Reminders';
import Page404 from './components/Page404';

// It begins!
function App(props) {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [plants, updatePlants] = useState([]);
    const [filteredPlants, updateFilteredPlants] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [specificUser, updateSpecificUser] = useState([]);
    const [fetchingUser ,pdateSpecificUser] = useState(true);
    //const [weather, updateWeather] = useState([]);

    useEffect(() => {
        fetchUser();
        if (isLoggedIn) {
            fetchPlants();
            fetchReminders();
            fetchFilterPlants();
        }
    }, [isLoggedIn]); 

    // useEffect(() => {
    //     props.history.push('/plants');
    // }, [filteredPlants])

    // useEffect(() => {
    //     fetchWeather();
    // }, [weather])

    // const fetchWeather = async () => {
    //     try{
    //         let response = await axios.get(`http://api.weatherbit.io/v2.0/current?&postal_code=42103&country=DE&key=40b97bfea4d145428c756bc5caf74cbb`)
    //         updateWeather(response.data)
    //         console.log(weather)
    //     }
    //     catch(err){
    //         console.log('failed to get the weahter')
    //     }
    // };

//----------------------------------------------------------
//------------------------   FETCH USER     ----------------
//----------------------------------------------------------
    const fetchUser = async () => {
        try {
            let response = await axios.get('http://localhost:5005/api/user', {withCredentials: true});
            setUser(response.data);
            setIsLoggedIn(true);
            pdateSpecificUser(false)
        }
        catch (err) {
            console.log('User not logged in', err);
            setIsLoggedIn(false);
            pdateSpecificUser(false)
        };
    };

//----------------------------------------------------------
//------------------------   FETCH PLANTS   ----------------
//----------------------------------------------------------
    const fetchPlants = async () => {
        try {
            let response = await axios.get(`http://localhost:5005/api/plants`, {withCredentials: true});
            updatePlants(response.data);
        }
        catch (err) {
            console.log('plants fetch failed', err)
        };
    };

//----------------------------------------------------------
//------------------------   FETCH FILTER PLANTS -----------
//----------------------------------------------------------
    const fetchFilterPlants = async () => {
        try {
            let response = await axios.get(`http://localhost:5005/api/plants`, {withCredentials: true});
            updateFilteredPlants(response.data);
        }
        catch (err) {
            console.log('plants fetch failed', err)
        };
    };

//----------------------------------------------------------
//--------------------   FETCH ALL REMINDERS----------------
//----------------------------------------------------------
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

//----------------------------------------------------------
//------------------------   SIGN UP        ----------------
//----------------------------------------------------------
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

//----------------------------------------------------------
//------------------------   LOGN IN        ----------------
//----------------------------------------------------------
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

//----------------------------------------------------------
//------------------------   LOGOUT         ----------------
//----------------------------------------------------------
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

//----------------------------------------------------------
//------------------------   DELETE USER    ----------------
//----------------------------------------------------------
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

//----------------------------------------------------------
//------------------------   ADD A NEW PLANT ---------------
//----------------------------------------------------------
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
            console.log(plants, 'in add plant handler')
            updatePlants([newPlant, ...plants])
            updateFilteredPlants([newPlant, ...filteredPlants])
            props.history.push('/plants')
        }
        catch (err) {
            console.log('create plant failed', err);
        };
    };

//----------------------------------------------------------
//------------------------  DELETE A PLANT  ----------------
//----------------------------------------------------------
    const handleDeletePlant = async (plantId) => {
        try{
            axios.delete(`http://localhost:5005/api/plants/${plantId}`, {withCredentials: true})
            let filteredPlants = plants.filter((plant) => {
                return plant._id !== plantId
            })
            updatePlants(filteredPlants);
            updateFilteredPlants(filteredPlants);
            props.history.push('/plants');
        }
        catch(err){
            console.log('delete plant failed', err)
        }
    }

//----------------------------------------------------------
//------------------------ EDIT A PLANT     ----------------
//----------------------------------------------------------
    const handleEditPlant = async (event, plant) => {
        event.preventDefault()
        try {
            await axios.patch(`http://localhost:5005/api/plants/${plant._id}/edit`, plant, {withCredentials: true})
            let updatePlant = plants.map((singleplant) => {
                if (singleplant._id === plant._id){
                    singleplant.photo = plant.photo
                    singleplant.name = plant.name
                    singleplant.description = plant.description
                    singleplant.waterFreq = plant.waterFreq
                    singleplant.fertiliseFreq = plant.fertiliseFreq
                    singleplant.isAlive = plant.isAlive
                }
                return singleplant
            })
            updatePlants(updatePlant);
            updateFilteredPlants(updatePlant);
            props.history.push('/plants');
            
        }
        catch(err){
            console.log('edit plant fetch failed', err)
        }
    }

//----------------------------------------------------------
//------------------   SEARCH FOR PLANT NAME ---------------
//----------------------------------------------------------
    const handleSearch = (event) => {
        let searchPlant = event.target.value
        
        let filteredPlants = plants.filter((plant) => {
            return(
                plant.name.toLowerCase().includes(searchPlant.toLowerCase()) 
            ) 
        })

        updateFilteredPlants(filteredPlants)
    }

//----------------------------------------------------------
//----------------------   UPDATE REMINDER STATUS  ---------
//----------------------------------------------------------
const handleReminder = async (reminderId) => {
    try {
        await axios.patch(`http://localhost:5005/api/reminders/${reminderId}`, {}, {withCredentials: true});
        let response = await axios.get(`http://localhost:5005/api/reminders`, {withCredentials: true})
        setReminders(response.data)
    }
    catch (err) {
        console.log('handling the reminder failed', err);
    };
}

//----------------------------------------------------------
//----------------------   EDIT USER PROFILE       ---------
//----------------------------------------------------------
const handleEditProfile = async (event, profile) => {
    event.preventDefault()
    try {
        await axios.patch(`http://localhost:5005/api/profile/${profile._id}`, profile, {withCredentials: true})
        let updateProfile = specificUser.map((singleUser) => {
            if (singleUser._id === profile._id) {
                singleUser.name = profile.name
                singleUser.username = profile.username
            }
            return singleUser
        })
        updateSpecificUser(updateProfile)
        props.history.push('/');
    }
    catch(err){
        console.log('handling edit profile error', err)
    }
}

if (fetchingUser) {
    return <p>Loading . .. . </p>
}

//----------------------------------------------------------
//------------------------   ROUTES         ----------------
//----------------------------------------------------------
    return (
        <div className="App">
            {/* Navbar */}
            <Nav user={user} onLogOut={handleLogOut} isLoggedIn={isLoggedIn} />
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
                <Route path={'/profile/:userId'} render={(routeProps) => {
                    return <Profile onEdit={handleEditProfile} onDeleteUser={handleDeleteUser} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/dashboard'} render={(routeProps) => {
                    return <Dashboard plants={plants} reminders={reminders} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/plants'} render={(routeProps) => {
                    return <MyPlants onSearch={handleSearch} plants={filteredPlants} isLoggedIn={isLoggedIn} {...routeProps}/>
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
                    return <Reminders onWatering={handleReminder} reminders={reminders} isLoggedIn={isLoggedIn} {...routeProps}/>
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
