import React from 'react';

// Material UI
import Container from '@material-ui/core/Container';

function AddPlant(props) {
    const {isLoggedIn, onAddPlant} = props
    return (
        <Container>
            <div>
                <h1>Add Plant</h1>
                <p> Login status: {isLoggedIn.toString()}</p>
                <form onSubmit={onAddPlant} action="/plants/create" encType="multipart/form-data">

                    <div className="form-group">
                        <input type="file" name="photo" accept="image/png, image/jpg" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputName">Name</label>
                        <input type="text"  name="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputUsername">Description</label>
                        <input type="text" className="form-control"  name="description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputEmail">Water Frequency</label>
                        <input type="number" name="waterFreq" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputPassword">Fertilizer Frequency</label>
                        <input name="fertiliseFreq" type="number" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </ Container>
    );
};

export default AddPlant;