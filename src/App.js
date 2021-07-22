import { React } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import axios from 'axios';

// Components
import HomePage from "./components/HomePage";
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import MyPlants from './components/MyPlants';
import AddPlant from './components/AddPlant';
import PlantDetails from './components/PlantDetails';
import EditPlant from './components/EditPlant';

function App(props) {
  
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
          await axios.post('http://localhost:5005/api/signup', newUser, {withCredentials: true})
          props.history.push('/login')
      }
      catch (err) {
          console.log('Signup failed', err)
      };
  };

  const handleLogIn = async (event) => {
      event.preventDefault();
      console.log('user logged in')
      const {username, password} = event.target;
      let loggedInUser = {
          username: username.value,
          password: password.value,
      };
      try {
          await axios.post('http://localhost:5005/api/signup', loggedInUser, {withCredentials: true})
          props.history.push('/dashboard')
      }
      catch (err) {
          console.log('Login failed', err)
      }
  };

  return (
      <div className="App">
        <Switch>
            <Route exact path={'/'} component={HomePage} />
            <Route path={'/signup'} render={(routeProps) => {
                return <Signup onSignUp={handleSignUp} {...routeProps}/>
            }} />
            <Route path={'/login'} render={(routeProps) => {
                return <Login onLogin={handleLogIn} {...routeProps}/>
            }} />
            <Route path={'/profile'} render={() => {
                return <Profile />
            }} />
            <Route path={'/dashboard'} render={() => {
                return <Dashboard />
            }} />
            <Route exact path={'/plants'} render={() => {
              return <MyPlants />
            }} />
            <Route path={'/plants/create'} render={() => {
              return <AddPlant />
            }} />
            <Route path={'/plants/:plantId'} render={() => {
              return <PlantDetails />
            }} />
            <Route path={'/plants/:plantId/edit'} render={() => {
              return <EditPlant />
            }} />
        </Switch>
    </div>
  );
}

export default withRouter(App);
