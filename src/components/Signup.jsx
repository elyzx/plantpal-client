import React from 'react';
import {Redirect} from 'react-router-dom';

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function Signup(props) {
    const {onSignUp, isLoggedIn, myError} = props
    if (isLoggedIn) {
        return <Redirect to={'/dashboard'} />
    }
    return (
        <Container>
            <div className='flex-box'> 
                <h1>Create an account</h1>
            </div>
            <div className='flex-box'> 
                <form onSubmit={onSignUp}>
                    <div className="form-group">
                        <label htmlFor="InputName">Name</label>
                        <input type="text" className="form-control" id="InputName" name="name" placeholder="Enter your name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputUsername">Username</label>
                        <input type="text" className="form-control" id="InputUsername" name="username" placeholder="Create a case-sensitive username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputEmail">Email address</label>
                        <input type="email" className="form-control" id="InputEmail" name="email" placeholder="Enter your email address"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputPassword">Password</label>
                        <input name="password" type="password" className="form-control" id="password" placeholder="Create a password"/>
                    </div>
                    <Button type="submit" className="btn btn-primary">Submit</Button>
                    {
                        myError ? (
                             <p>{myError}</p>
                        ) : ''
                    }
                </form>
            </div>
        </Container>
    );
};

export default Signup;

