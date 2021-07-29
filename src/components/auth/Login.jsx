import React from 'react';
import {Redirect} from 'react-router-dom';

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function Login(props) {
    const {onLogIn, isLoggedIn, myError} = props

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

    if (isLoggedIn) {
        console.log("user is logged in; go back")
        return <Redirect to={'/dashboard'} />
    }
    
    return (
        <Container>
            <div className='flex-box'>
                <h1>Log in to PlantPal</h1>
            </div>
            <div className='flex-box'>
                <form onSubmit={onLogIn}>
                    <div className="form-group">
                        <label htmlFor="InputUsername">Username</label>
                        <input name="username" type="text" className="form-control" id="username" placeholder="Enter your username"/>
                    </div>
                    <div>  </div>
                    <div className="form-group">
                        <label htmlFor="InputPassword">Password</label>
                        <input name="password" type="password" className="form-control" id="password" placeholder="Enter your password" />
                    </div>
                    <div className='flex-box'>
                        <Button style={style} type="submit" className="btn btn-primary">Submit</Button>
                    </div>
                    {
                        myError ? (
                             <p className='errorMsg'>{myError}</p>
                        ) : ''
                    }
                </form>
            </div>
        </Container>
    );
};

export default Login;