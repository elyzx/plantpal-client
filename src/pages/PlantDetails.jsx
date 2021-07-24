import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import SideNav from '../components/SideNav';
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
            console.log(response.data)
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
    

    return (
        <div>
            <SideNav onLogOut={onLogOut} />
            <div className="body-container">
                Hello I'm the plant details
                <p> Login status: {isLoggedIn.toString()}</p>
                <h1>{plantDetail.name}</h1>
                <h2>{plantDetail.description}</h2>
                <h2>Water Frequency: {plantDetail.waterFreq}</h2>
                <h2>Fertilise Frequency: {plantDetail.fertiliseFreq}</h2>
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
        </div>
    );
};

export default PlantDetails;