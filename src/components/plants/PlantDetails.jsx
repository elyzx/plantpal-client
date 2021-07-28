import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function PlantDetails(props) {
    const {reminders, plants} = props;
    let plantId = props.match.params.plantId
    let plant = plants.find((p) => p._id == plantId)
    const options = {month: 'short', day: 'numeric'};

    if (!plant) {
        return 'Loading . . .'
    } 

    const live = () => {
        if (plant.isAlive === true){
           return <p>Alive</p>
         }
         else{
            return <p>Deceased</p>
         }
    }
    
    let nextReminderDate = undefined
    if (reminders) {
        let nextWateringReminder = reminders.find((r) => r.plant._id === plant._id && !r.complete)
        console.log('nextWateringReminder', nextWateringReminder)
        if (nextWateringReminder) {
            nextReminderDate = nextWateringReminder.nextWatering
        }
    }

    return (
        <Container>
            <> 
                <div className='space-between'>
                    <Link to='/plants'><Button>Go Back</Button></Link>
                    <h3>Next Reminder: {new Intl.DateTimeFormat('en-GB', options).format(nextReminderDate)}</h3>
                </div>

                <div className='flex-box'>
                    <h1>{plant.name}</h1>
                </div>

                <div className='flex-box'>
                    {live()}
                </div>

                <div className='flex-box'>
                    <p>I need watering every {plant.waterFreq} days.</p>
                </div>

                <div className='flex-box padded'>
                    <img src={plant.photo} alt='{plant.name}' height='500'/>
                </div>

                <div className='flex-box'>
                    <Link to={`/plants/${plant._id}/edit`}>
                        <Button>Edit</Button>
                    </Link>
                    <Link>
                        <Button onClick={() => {props.onDelete(plant._id)}}>Delete</Button>
                    </Link>
                </div>
            </>          
        </ Container>
    );
};

export default PlantDetails;