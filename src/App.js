import React, { useState} from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import axios from 'axios';

// Components
import HomePage from './components/HomePage';
import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import MyPlants from './components/MyPlants';
import AddPlant from './components/AddPlant';
import PlantDetails from './components/PlantDetails';
import EditPlant from './components/EditPlant';
import Page404 from './components/Page404';
import Footer from './components/Footer';

function App(props) {

  const [user, updateUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          updateUser(response.data)
          setIsLoggedIn(true)
          props.history.push('/dashboard');
      }
      catch (err) {
          console.log('Login failed', err);
      };
  };

  const handleLogOut = async () => {
    try {
        await axios.post(`http://localhost:5005/api/logout`, {}, {withCredentials: true})
        updateUser(null)
        setIsLoggedIn(false)
        props.history.push('/')
    }
    catch (err) {
        console.log('Logout failed', err)
    }
  }

  return (
      <div className="App">
        {/* Navbar */}
        <TopNav onLogOut={handleLogOut} isLoggedIn={isLoggedIn} />
        <SideNav isLoggedIn={isLoggedIn}/>
        {/* Pages */}
        <Switch>
            {/* Public Pages */}
            <Route exact path={'/'} render={(routeProps) => {
              return <HomePage user={user} isLoggedIn={isLoggedIn} {...routeProps} />
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
            <Route exact path={'/plants/create'} render={(routeProps) => {
              return <AddPlant user={user} isLoggedIn={isLoggedIn} {...routeProps}/>
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
