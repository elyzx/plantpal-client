import React, { useState } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import axios from 'axios';

// Components
import HomePage from './components/HomePage';
import TopNav from './components/TopNav';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import MyPlants from './components/MyPlants';
import AddPlant from './components/AddPlant';
import PlantDetails from './components/PlantDetails';
import EditPlant from './components/EditPlant';
import Page404 from './components/Page404';

function App(props) {

  const [user, setUser] = useState(null);
  const [plants, updatePlatns] = useState([])
  
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
          props.history.push('/dashboard');
      }
      catch (err) {
          console.log('Login failed', err);
      };
  };

  const handleAddPlant = async (event) => {
    event.preventDefault()
    const { name, description, waterFreq, fertiliseFreq} = event.target
    let newPlant = {
          name: name.value,
          description: description.value,
          waterFreq: waterFreq.value,
          fertiliseFreq: fertiliseFreq.value,
    };
    try{
        await axios.post('http://localhost:5005/api/plants/create', newPlant )
        updatePlatns([newPlant, ...plants])

    }catch(err){
        console.log('create plant failed', err)
    }

  }

  return (
      <div className="App">
        {/* Navbar */}
        <TopNav />
        {/* Pages */}
        <Switch>
            {/* Public Pages */}
            <Route exact path={'/'} component={HomePage} />
            <Route path={'/signup'} render={(routeProps) => {
                return <Signup onSignUp={handleSignUp} {...routeProps}/>
            }} />
            <Route path={'/login'} render={(routeProps) => {
                return <Login onLogIn={handleLogIn} {...routeProps}/>
            }} />
            {/* Protected Pages */}
            <Route path={'/profile'} render={() => {
                return <Profile />
            }} />
            <Route path={'/dashboard'} render={() => {
                return <Dashboard />
            }} />
            <Route exact path={'/plants'} render={() => {
              return <MyPlants />
            }} />
            <Route path={'/plants/create'} render={(routeProps) => {
              return <AddPlant onAddPlant={handleAddPlant}  {...routeProps}/>
            }} />
            <Route path={'/plants/:plantId'} render={() => {
              return <PlantDetails />
            }} />
            <Route path={'/plants/:plantId/edit'} render={() => {
              return <EditPlant />
            }} />
            {/* Page Not Found */}
            <Route path={'*'} component={Page404} />
        </Switch>
    </div>
  );
}

export default withRouter(App);
