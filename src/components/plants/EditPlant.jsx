import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function EditPlant(props) {
    const {onEdit, plants} = props
    let plantId = props.match.params.plantId
    let plant = plants.find((p) => p._id == plantId)
    const [plantDetail, updatePlantDetail] = useState(plant)

    useEffect(() => {
        updatePlantDetail(plant);
    }, [plant]);

    const handleChangeDetails = (event) => 
    updatePlantDetail({
            ...plantDetail,
            [event.target.name]: event.target.value,
        });

    // const handlePhotoChange = (event) => {
    //     let newPhoto = event.target.value
    //     updatePlantDetail({...plantDetail, name: newPhoto})
    // }
    // const handleNameChange = (event) => {
    //     let newName = event.target.value
    //     updatePlantDetail({...plantDetail, name: newName})
    // }
    // const handleDescriptionChange = (event) => {
    //     let newDescription = event.target.value
    //     updatePlantDetail({...plantDetail, description: newDescription})
    // }
    // const handleWaterFreqChange = (event) => {
    //     let newWaterfreq = event.target.value
    //     updatePlantDetail({...plantDetail, waterFreq: newWaterfreq})
    // }
    // const handleIsAliveChange = (event) => {
    //     let newIsAlive = event.target.value
    //     updatePlantDetail({...plantDetail, isAlive: newIsAlive})
    // }

    if(!plantDetail){
        return 'Loading...'
    }

    return (
        <Container>
            <>
                <div className='space-between'>
                    <Link to='/plants'><Button>Go Back</Button></Link>
                </div>

                <div className="flex-box">
                    <h1>Edit Plant</h1>
                </div>

                <div className="flex-box">
                    <form onSubmit={onEdit}>
                        <input type="hidden" name="plantId" value={plantDetail._id}/>
                        <input onChange={handleChangeDetails} value={plantDetail.name}  name="name"  type="text"  placeholder="Enter name"/>
                        <input onChange={handleChangeDetails} value={plantDetail.description} name="description"  type="text"  placeholder="Enter description"/>
                        <input onChange={handleChangeDetails} value={plantDetail.waterFreq}  name="waterFreq"  type="number"  placeholder="Set frequency for reminders (in days)"/>
                        {/* <input onChange={handleFertiliseFreqChange} value={plantDetail.fertiliseFreq}  name="fertiliseFreq"  type="number"  placeholder="Enter name"/> */}
                        {/* <input onChange={handleIsAliveChange} value={plantDetail.isAlive}  name="isAlive"  type="text"  placeholder="Enter name"/> */}

                        <label for="isAlive">Choose the status:</label>
                        <select onChange={handleChangeDetails} id="plantDetail.isAlive" name="isAlive">
                            <option value="">Is it alive or dead?</option>   
                            <option  value="true">Alive</option>
                            <option  value="false">Dead</option>
                        </select>

                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            </>
        </Container>
    );
};

export default EditPlant;