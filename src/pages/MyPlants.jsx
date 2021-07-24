import React from 'react';
import {Link} from 'react-router-dom';
import './PageLayout.css';

function MyPlants(props) {
    const {isLoggedIn, plants} = props
    console.log(plants)
    return (
        <>
            <div className="body-container">
                My Plants
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
        </>
    );
};

export default MyPlants;