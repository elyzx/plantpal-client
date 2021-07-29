import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function AddPlant(props) {
    const {onAddPlant} = props
    return (
        <Container>
            <>
                <div className='space-between'>
                    <Link to='/plants'><Button>Go Back</Button></Link>
                </div>

                <div className='flex-box'>
                    <h1>Add Plant</h1>
                </div>

                <div className='flex-box'>
                    <form onSubmit={onAddPlant} action="/plants/create" encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="InputName">Name</label>
                            <input type="text"  name="name" placeholder="e.g. Freddie" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputUsername">Description</label>
                            <input type="text" name="form-control"  placeholder="e.g. my beloved cheeseplant" name="description" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputEmail">Reminder Frequency</label>
                            <input type="number" name="waterFreq" placeholder="Number of days" required/>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="InputPassword">Fertilizer Frequency</label>
                            <input name="fertiliseFreq" type="number" />
                        </div> */}
                        <div className="form-group">
                            <label htmlFor="InputUsername">Plant Photo</label>
                            <input type="file" name="photo" accept="image/png, image/jpg" required />
                        </div>
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                    </form>
                </div>
            </>
        </ Container>
    );
};

export default AddPlant;