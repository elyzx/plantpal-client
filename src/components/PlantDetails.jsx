import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function PlantDetails(props) {
    const {reminders} = props;
    const [plantDetail, updatePlantDetail] = useState({});
    const options = {month: 'short', day: 'numeric'};

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
           return <p>Alive</p>
         }
         else{
            return <p>Deceased</p>
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
            <> 
                <div className='space-between'>
                    <Link to='/plants'><Button color='secondary'>Go Back</Button></Link>
                    <h3>Next Watering: {new Intl.DateTimeFormat('en-GB', options).format(reminders.nextWatering)}</h3>
                </div>
                <div className='flex-box'>
                    <h1>{plantDetail.name}</h1>
                </div>
                <div className='flex-box'>
                    <img src={plantDetail.photo} alt='{plantDetail.name}' height='500'/>
                    <div className='padded'>
                    <h4>Name: {plantDetail.name}</h4>
                    <p>{plantDetail.description}</p>
                    <p>I need watering every {plantDetail.waterFreq} days</p>
                        {live()}
                    <Link to={`/plants/${plantDetail._id}/edit`}>
                        <Button>Edit</Button>
                    </Link>
                    <button onClick={() => { props.onDelete(plantDetail._id) }}>
                        <Button >Delete</Button>
                    </button>  
                    </div>
                </div>
            </>          
        </ Container>
    );
};

export default PlantDetails;