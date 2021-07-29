import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function AddPlant(props) {
    const {onAddPlant} = props

    const style = {
        background: 'linear-gradient(45deg, #C8FACC 30%, #FFF6CE 90%)',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 40,
        padding: '0 30px',
        marginTop: '20px',
      };

      const space = {
          marginTop: '15px',
          
      }

    return (
        <Container>
            <>
                <div className='space-between'>
                    <Link to='/plants'><Button>Go Back</Button></Link>
                </div>

                <div className='flex-box'>
                    <h1>Add Plant</h1>
                </div>

                <div  className='flex-box'>
                    <form  onSubmit={onAddPlant} action="/plants/create" encType="multipart/form-data">
                        <div style={space} className="form-group">
                            <label style={space}  htmlFor="InputName">Name</label>
                            <input style={space}  type="text" name="name" placeholder="e.g. Freddie" maxlength="40" required/>
                        </div>
                        <div style={space} className="form-group">
                            <label style={space}  htmlFor="InputUsername">Description</label>
                            <input style={space} type="text" className="form-control"  placeholder="e.g. my beloved cheeseplant" maxlength="80" name="description" />
                        </div>
                        <div style={space} className="form-group">
                            <label style={space} htmlFor="InputEmail">Reminder Frequency</label>
                            <input style={space} type="number" name="waterFreq" placeholder="Number of days" min="0" max="30" required/>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="InputPassword">Fertilizer Frequency</label>
                            <input name="fertiliseFreq" type="number" />
                        </div> */}
                        <div style={space} className="form-group">
                            <label style={space} htmlFor="InputUsername">Plant Photo</label>
                            <input style={space} type="file" name="photo" accept="image/png, image/jpg" required />
                        </div>
                        <div className='flex-box'>
                            <Button style={style} type="submit" className="btn btn-primary">Submit</Button>
                        </div>
                    </form>
                </div>
            </>
        </Container>
    );
};

export default AddPlant;