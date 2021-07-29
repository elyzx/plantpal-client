// Setup
import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import axios from 'axios';
import './App.css';

// Components
import Nav from './components/Nav';
import LandingPage from './components/LandingPage';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import Dashboard from './components/Dashboard';
import MyPlants from './components/plants/MyPlants';
import AddPlant from './components/plants/AddPlant';
import PlantDetails from './components/plants/PlantDetails';
import EditPlant from './components/plants/EditPlant';
import Reminders from './components/reminders/Reminders';
import Page404 from './components/Page404';
import config from './config'

// Material UI 
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#C8FACC',
        dark: '#00534A',
      },
      secondary: {
        main: '#D1F2FF',
        dark: '#05297A',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

// It begins!
function App(props) {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [plants, updatePlants] = useState([]);
    const [filteredPlants, updateFilteredPlants] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [fetchingUser, updateFetchingUser] = useState(true);
    const [signupError, updateSignupError] = useState(null)
    const [loginError, updateLoginError] = useState(null)
    const [temper, updateTempr] = useState(null)

    useEffect(() => {
        fetchUser();
        if (isLoggedIn) {
            fetchPlants();
            fetchFilterPlants();
        }
    }, [isLoggedIn]); 

    useEffect(() => {
        if (isLoggedIn) {
            fetchReminders();
        }
    }, [plants, filteredPlants]); 

    useEffect(() =>{
        if(!user){
            props.history.push('/');
        } 
    }, [user])


//----------------------------------------------------------
//------------------------   WEATHER API   ----------------
//----------------------------------------------------------
    const handleWeather = async () => {
        try{
            let response = await axios.get(`${config.API_URL}/api/dashboard/test`, {withCredentials: true})  
            console.log('temperatura', response.data.data[0].temp)
            let temp = response.data.data[0].temp
            updateTempr(temp)
        }
        catch{
            console.log('error weather')
        }
    }
    

//----------------------------------------------------------
//------------------------   FETCH USER     ----------------
//----------------------------------------------------------
    const fetchUser = async () => {
        try {
            let response = await axios.get(`${config.API_URL}/api/user`, {withCredentials: true});
            setUser(response.data);
            setIsLoggedIn(true);
            updateFetchingUser(false)
        }
        catch (err) {
            console.log('User not logged in', err);
            setUser(null);
            setIsLoggedIn(false);
            updateFetchingUser(false)
            props.history.push('/')
        };
    };

//----------------------------------------------------------
//------------------------   FETCH PLANTS   ----------------
//----------------------------------------------------------
    const fetchPlants = async () => {
        try {
            let response = await axios.get(`${config.API_URL}/api/plants`, {withCredentials: true});
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
            let response = await axios.get(`${config.API_URL}/api/plants`, {withCredentials: true});
            updateFilteredPlants(response.data);
        }
        catch (err) {
            console.log('plants fetch failed', err)
        };
    };

//----------------------------------------------------------
//--------------------   FETCH ALL REMINDERS----------------
//----------------------------------------------------------
    // handle date type -> DB returns a string
    const handleDatesInReminders = (reminders) => {
        reminders.map((reminder) => {
            if (reminder.nextWatering) {
                reminder.nextWatering = Date.parse(reminder.nextWatering)
            }
            if (reminder.wateredAt) {
                reminder.wateredAt = Date.parse(reminder.wateredAt)
            }
        })
        return reminders
    };

    const fetchReminders = async () => {
        try {
            let response = await axios.get(`${config.API_URL}/api/reminders`, {withCredentials: true})
            setReminders(handleDatesInReminders(response.data))
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
        const {name, username, email, password, country, postal} = event.target;
        let newUser = {
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value,
            country: country.value,
            postal: postal.value,
        };
        try {
            await axios.post(`${config.API_URL}/api/signup`, newUser, {withCredentials: true});
            updateSignupError(null);
            props.history.push('/login');
        }
        catch (err) {
            console.log('Signup failed', err);
            updateSignupError(err.response.data.errorMessage)
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
            let response = await axios.post(`${config.API_URL}/api/login`, myUser, {withCredentials: true});
            setUser(response.data);
            console.log('login function', response.data)
            setIsLoggedIn(true);
            updateLoginError(null)
            props.history.push('/dashboard');
        }
        catch (err) {
            console.log('Login failed', err);
            updateLoginError(err.response.data.error)
        };
    };

//----------------------------------------------------------
//------------------------   LOGOUT         ----------------
//----------------------------------------------------------
    const handleLogOut = async () => {
        try {
            await axios.post(`${config.API_URL}/api/logout`, {}, {withCredentials: true});
            setUser(null);
            setIsLoggedIn(false);
            console.log('Logout succesful')
          
        }
        catch (err) {
            console.log('Logout failed', err);
        };
    };

//----------------------------------------------------------
//----------------------   EDIT USER PROFILE       ---------
//----------------------------------------------------------
const handleEditProfile = (event) => {
    event.preventDefault()
    let name = event.target.name.value;
    let username = event.target.username.value;
    let email = event.target.email.value;

    axios.patch(`${config.API_URL}/api/profile`, {name, username, email}, {withCredentials: true})
    .then((response) => {
        setUser(response.data);
        props.history.push('/dashboard');
    })
    .catch((err) => {
        console.log('handling edit profile error', err)
    })
};
//----------------------------------------------------------
//------------------------   DELETE USER    ----------------
//----------------------------------------------------------
    const handleDeleteUser = async (user) => {
        try {
            await axios.delete(`${config.API_URL}/api/profile`, {withCredentials: true});
            console.log('in the try', user)
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

        let imgResponse = await axios.post(`${config.API_URL}/api/upload`, formData)

        const { name, description, waterFreq} = event.target;
        let newPlant = {
            name: name.value,
            description: description.value,
            waterFreq: waterFreq.value,
            photo: imgResponse.data.photo
        }
        try {
            let response = await axios.post(`${config.API_URL}/api/plants/create`, newPlant , {withCredentials: true});
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
        try {
            await axios.delete(`${config.API_URL}/api/plants/${plantId}`, {withCredentials: true})
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
    const handleEditPlant = (event) => {
        event.preventDefault()
        console.log('event', event)
        let plantId = event.target.plantId.value;
        let name = event.target.name.value;
        let description = event.target.description.value;
        let waterFreq = event.target.waterFreq.value;
        let isAlive = event.target.isAlive.value

        axios.patch(`${config.API_URL}/api/plants/${plantId}/edit`, {name, description, waterFreq, isAlive}, {withCredentials: true})
        .then((response) => {
            let newPlant = response.data
            console.log("newplant", newPlant)
            let p = plants.filter((p) => p._id !== newPlant._id)
            updatePlants([newPlant, ...p])

            let fp = filteredPlants.filter((p) => p._id !== newPlant._id)
            updateFilteredPlants([newPlant, ...fp])
            props.history.push('/plants')
        })
        .catch((err) => {
            console.log('handling plant details error', err)
        })
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
        await axios.patch(`${config.API_URL}/api/reminders/${reminderId}`, {}, {withCredentials: true});
        let response = await axios.get(`${config.API_URL}/api/reminders`, {withCredentials: true})
        setReminders(handleDatesInReminders(response.data))
    }
    catch (err) {
        console.log('handling the reminder failed', err);
    };
}

//------------------------   FETCH USER        ----------------
if (fetchingUser) {
    return <p>Loading . . . </p>
}

//----------------------------------------------------------
//------------------------   ROUTES         ----------------
//----------------------------------------------------------
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
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
                    return <Signup myError={signupError} onSignUp={handleSignUp} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route path={'/login'} render={(routeProps) => {
                    return <Login myError={loginError} onLogIn={handleLogIn} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                {/* Protected Pages */}
                <Route path={'/profile'} render={(routeProps) => {
                    return <Profile user={user} onEdit={handleEditProfile} onDeleteUser={handleDeleteUser} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/dashboard'} render={(routeProps) => {
                    return <Dashboard user={user} plants={plants} reminders={reminders} onWatering={handleReminder} weather={handleWeather} temper={temper} {...routeProps}/>
                }} />
                <Route exact path={'/plants'} render={(routeProps) => {
                    return <MyPlants onSearch={handleSearch} plants={filteredPlants} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route path={'/plants/create'} render={(routeProps) => {
                    return <AddPlant onAddPlant={handleAddPlant} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/plants/:plantId'} render={(routeProps) => {
                    return <PlantDetails plants={plants} reminders={reminders} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route path={'/plants/:plantId/edit'} render={(routeProps) => {
                    return <EditPlant plants={plants} onEdit={handleEditPlant} onDelete={handleDeletePlant} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                <Route exact path={'/reminders'} render={(routeProps) => {
                    return <Reminders onWatering={handleReminder} reminders={reminders} isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                 <Route exact path={'/dashboard/test'} render={(routeProps) => {
                    return <Dashboard user={user} plants={plants} reminders={reminders} weather={handleWeather}  isLoggedIn={isLoggedIn} {...routeProps}/>
                }} />
                {/* Page Not Found */}
                <Route component={Page404} />
            </Switch>
            </div>
            </ThemeProvider>
        </div>
    );
};

export default withRouter(App);
