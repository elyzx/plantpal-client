import React from "react";
import { Switch, Route } from "react-router-dom";

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

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'} component={HomePage} />
        <Route path={'/signup'} render={() => {
            return <Signup />
        }} />
        <Route path={'/login'} render={() => {
            return <Login />
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

export default App;
