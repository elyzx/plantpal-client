import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function EditPlant(props) {
    const {onEdit, plants} = props
    let plantId = props.match.params.plantId
    let plant = plants.find((p) => p._id === plantId)
    const [plantDetail, updatePlantDetail] = useState(plant)


    useEffect(() => {
        updatePlantDetail(plant);
    }, [plant]);

    const style = {
        background: 'linear-gradient(45deg, #C8FACC 30%, #FFF6CE 90%)',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px #FFF6CE',
        marginTop: '20px',
      };

      const space = {
        marginTop: '15px',
    }

    const handleChangeDetails = (event) => 
    updatePlantDetail({
            ...plantDetail,
            [event.target.name]: event.target.value,
        });

    if (!plantDetail){
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
                        <input style={space} type="hidden" name="plantId" value={plantDetail._id}/>
                        <input style={space} onChange={handleChangeDetails} value={plantDetail.name}  name="name"  type="text" maxlength = "40"  placeholder="Enter name"/>
                        <input style={space} onChange={handleChangeDetails} value={plantDetail.description} name="description"  type="text" maxlength = "80" placeholder="Enter description"/>
                        <input style={space}  onChange={handleChangeDetails} value={plantDetail.waterFreq}  name="waterFreq"  type="number"  placeholder="Set frequency for reminders (in days)"/>
                        {/* <input onChange={handleFertiliseFreqChange} value={plantDetail.fertiliseFreq}  name="fertiliseFreq"  type="number"  placeholder="Enter name"/> */}
                        {/* <input onChange={handleIsAliveChange} value={plantDetail.isAlive}  name="isAlive"  type="text"  placeholder="Enter name"/> */}

                        <label for="isAlive">Choose the status:</label>
                        <select style={space} onChange={handleChangeDetails} id="plantDetail.isAlive" name="isAlive">
                            <option value="">Is it alive or dead?</option>   
                            <option  value="true">Alive</option>
                            <option  value="false">Dead</option>
                        </select>
                        
                        <div className='flex-box'>
                            <Button style={style} type="submit">Submit</Button>
                        </div>

                    </form>
                </div>
                <div className='flex-box padded'>
                    <Link>
                        <Button onClick={() => {props.onDelete(plant._id)}}>Delete</Button>
                    </Link>
                </div>
            </>
        </Container>
    );
};

export default EditPlant;