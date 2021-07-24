import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './PageLayout.css'

function EditPlant(props) {

    const [plantDetail, updatePlantDetail] = useState(null)

    useEffect(async () => {
        try {
            let plantId = props.match.params.plantId
            let response = await axios.get(`http://localhost:5005/api/plants/${plantId}`)
            updatePlantDetail(response.data)
        }
        catch(err){
            console.log('edit plant fetch failed', err)
        }
    }, [])

    const {isLoggedIn, onLogOut} = props

    const handleNameChange = (event) => {
        let newName = event.target.value
        updatePlantDetail({...plantDetail, name: newName})
    }
    const handleDescriptionChange = (event) => {
        let newDescription = event.target.value
        updatePlantDetail({...plantDetail, description: newDescription})
    }
    const handleWaterFreqChange = (event) => {
        let newWaterfreq = event.target.value
        updatePlantDetail({...plantDetail, waterFreq: newWaterfreq})
    }
    const handleFertiliseFreqChange = (event) => {
        let newFertiliseFreq = event.target.value
        updatePlantDetail({...plantDetail, fertiliseFreq: newFertiliseFreq})
    }
    const handleIsAliveChange = (event) => {
        let newIsAlive = event.target.value
        updatePlantDetail({...plantDetail, isAlive: newIsAlive})
    }



    if(!plantDetail){
        return 'Loading...'
    }


    return (
        <>
            <div className='body-container'>
                <h1>Edit Plant</h1>
                <p> Login status: {isLoggedIn.toString()}</p>

            <form onSubmit={ (event) => {props.onEdit(event, plantDetail ) } } >
                <input onChange={handleNameChange} value={plantDetail.name}  name="name"  type="text"  placeholder="Enter name"/>
                <input onChange={handleDescriptionChange} value={plantDetail.description} name="description"  type="text"  placeholder="Enter desc"/>
                
                <input onChange={handleWaterFreqChange} value={plantDetail.waterFreq}  name="waterFreq"  type="number"  placeholder="Enter name"/>
                <input onChange={handleFertiliseFreqChange} value={plantDetail.fertiliseFreq}  name="fertiliseFreq"  type="number"  placeholder="Enter name"/>
                {/* <input onChange={handleIsAliveChange} value={plantDetail.isAlive}  name="isAlive"  type="text"  placeholder="Enter name"/> */}

                <label for="isAlive">Choose the status:</label>
                <select onChange={handleIsAliveChange} id="plantDetail.isAlive" name="isAlive">
                    <option value="">Is it alive or dead?</option>   
                    <option  value="true">Alive</option>
                    <option  value="false">Dead</option>
                </select>

                <button  type="submit">Submit</button>
            </form>

            </div>
        </>
    );
};

export default EditPlant;