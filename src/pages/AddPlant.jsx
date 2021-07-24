import React from 'react';
import './PageLayout.css';

function AddPlant(props) {
    const {isLoggedIn, onLogOut, onAddPlant} = props
    return (
        <>
            <div className='body-container'>
                <h1>Add Plant</h1>
                <p> Login status: {isLoggedIn.toString()}</p>
                <form onSubmit={onAddPlant}>
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
        </>
    );
};

export default AddPlant;