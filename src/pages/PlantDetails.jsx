import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios'

function PlantDetails(props) {

    const [plantDetail, updatePlanDetail] = useState(null)

    useEffect(async() => {
        try{
           let plantId = props.match.params.plantId
           let response = await axios.get(`http://localhost:5005/api/plants/${plantId}`) 
           updatePlanDetail(response.data)
        }
        catch(err){
            console.log('Plant detail fetch failed', err)
        }
    }, [])

    const {isLoggedIn} = props
    if (isLoggedIn === false) {
        return <Redirect to={'/login'} />
    }

    if (!plantDetail) {
        return 'page is Loading'
    } 

    return (
        <div>
            Hello I'm the plant details
            <p> Login status: {isLoggedIn.toString()}</p>

            <h1>{plantDetail.name}</h1>
            <h2>{plantDetail.description}</h2>
            <h2>Water Frequency: {plantDetail.waterFreq}</h2>
            <h2>Fertilise Frequency: {plantDetail.fertiliseFreq}</h2>
            <h2>Status: {plantDetail.isAlive}</h2>
            
        </div>
    );
};

export default PlantDetails;