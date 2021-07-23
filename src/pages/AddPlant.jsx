import React from 'react';
import {Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';

function AddPlant(props) {
    const {isLoggedIn, onAddPlant} = props
    if (isLoggedIn === false) {
        return <Redirect to={'/login'} />
    }
    return (
        <div>
                <div>
                    Hello I'm the signup form
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
                        <button type="submit" ><Link to={'/dashboard'}>Submit</Link></button>
                    </form>
                </div>
        </div>
    );
};

export default AddPlant;