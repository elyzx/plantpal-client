import React from 'react';
import {Redirect} from 'react-router-dom';

// Material UI
import Container from '@material-ui/core/Container';

function Login(props) {
    const {onLogIn, isLoggedIn} = props

    if (isLoggedIn) {
        console.log("user is logged in; go back")
        return <Redirect to={'/dashboard'} />
    }
    
    return (
        <Container>
            <h1>Log in to PlantPal</h1>
            <p> Login status: {isLoggedIn.toString()}</p>
            <form onSubmit={onLogIn}>
                <div className="form-group">
                    <label htmlFor="InputUsername">Username</label>
                    <input name="username" type="text" className="form-control" id="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="InputPassword">Password</label>
                    <input name="password" type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </ Container>
    );
};

export default Login;