import React from 'react';
import {Redirect} from 'react-router-dom';
import {Link} from  'react-router-dom';

function MyPlants(props) {
    const {isLoggedIn} = props

    const {plants} = props
    console.log(plants)

    if (isLoggedIn === false) {
        return <Redirect to={'/login'} />
    }
    return (
        <div>
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
    );
};

export default MyPlants;