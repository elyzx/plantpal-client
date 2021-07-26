import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

// Material UI
import Container from '@material-ui/core/Container';

function PlantDetails(props) {
    const {isLoggedIn, reminders} = props;
    const [plantDetail, updatePlantDetail] = useState({});

    useEffect(() => {
        fetchPlantDetails();
    }, []);

    const fetchPlantDetails = async () => {
        try {
            let plantId = props.match.params.plantId
            let response = await axios.get(`http://localhost:5005/api/plants/${plantId}`, {withCredentials: true});
            updatePlantDetail(response.data);
        }
        catch (err) {
            console.log('Plant details fetch failed', err);
        };
    };

    if (!plantDetail) {
        return 'page is Loading'
    } 

    const live = () => {
        if (plantDetail.isAlive === true){
           return <h2>Status: Is alive</h2>
         }
         else{
            return <h2>Status: Is not Alive</h2>
         }
    }
    
    let nextWatering = ""
    if (reminders) {
        let nextWateringReminder = reminders.find((r) => r.plant._id == plantDetail._id && !r.complete)
        if (nextWateringReminder) {
            nextWatering = nextWateringReminder.nextWatering
        }
    }

    return (
        <Container>
            <div>
                <h1>{plantDetail.name}</h1>
                {/* <p> Login status: {isLoggedIn.toString()}</p> */}
                <h2>{plantDetail.description}</h2>
                <h2>Last Watering</h2>
                <h2>Next Watering {nextWatering}</h2>
                <h2>Water Frequency: Every {plantDetail.waterFreq} days</h2>

                {
                    live()
                }
                <Link to={`/plants/${plantDetail._id}/edit`}>
                    <button>Edit</button>
                </Link>
               

                <button onClick={() => { props.onDelete(plantDetail._id) }}>
                    Delete
                </button>
            
                
            </div>          
        </ Container>
    );
};

export default PlantDetails;