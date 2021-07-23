import React from 'react';
import { Link } from 'react-router-dom'

// Components
import SideNav from './SideNav';
import Footer from './Footer';

function AddPlant(props) {
    const {onAddPlant} = props

    return (
        <div>
            <SideNav />
                <div>
                    Hello I'm the signup form
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
            <Footer />
        </div>
    );
};

export default AddPlant;