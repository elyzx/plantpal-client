// Setup
import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import SideNav from '../components/SideNav';
import './PageLayout.css'

function MyPlants(props) {
    const {isLoggedIn, onLogOut, user, plants} = props
    console.log(plants)

    if (!user) {
        return <Redirect to={'/login'} />
    }
    return (
        <div>
<<<<<<< HEAD
            Hello I'm all your plants
            <p> Login status: {isLoggedIn.toString()}</p>
            <Link to='/plants/create'>Add Plant</Link>
            {
                plants.map((plant, i) => {
                    return(
                     <div key={i}>
                        <p>
                        <Link to={`/plants/${plant._id}`}>{plant.name}</Link>
                        </p>
                     </div>
                    
             

                        
                    )
                })
            }
=======
            <SideNav onLogOut={onLogOut} />
            <div className="body-container">
                Hello I'm all your plants
                <p> Login status: {isLoggedIn.toString()}</p>
                <Link to='/plants/create'>Add Plant</Link>
                {
                    plants.map((plant, i) => {
                        return(
                        <div key={i}>
                            <p>
                            <Link to={`/plants/${plant._id}`}>{plant.name}</Link>
                            </p>
                        </div>
                        )
                    })
                }
            </div>
>>>>>>> ff6e5db169b0be4d681bf99cea16407e5ea6ddf8
        </div>
    );
};

export default MyPlants;