import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PageLayout.css';

function PlantDetails(props) {
    const {isLoggedIn, onLogOut} = props;
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

    return (
        <>
            <div className="body-container">
                Hello I'm the plant details
                <p> Login status: {isLoggedIn.toString()}</p>
                <h1>{plantDetail.name}</h1>
                <h2>{plantDetail.description}</h2>
                <h2>Water Frequency: {plantDetail.waterFreq}</h2>
                <h2>Fertilise Frequency: {plantDetail.fertiliseFreq}</h2>
                <h2>Status: {plantDetail.isAlive}</h2>
            </div>          
        </>
    );
};

export default PlantDetails;