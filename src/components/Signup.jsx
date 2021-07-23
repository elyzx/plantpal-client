import React from 'react';
import {Redirect} from 'react-router-dom';

function Signup(props) {
    const {onSignUp, isLoggedIn} = props
    if (isLoggedIn) {
        return <Redirect to={'/dashboard'} />
    }
    return (
        <div>
            Hello I'm the signup form
            <p> Login status: {isLoggedIn.toString()}</p>
            <form onSubmit={onSignUp}>
                <div className="form-group">
                    <label htmlFor="InputName">Name</label>
                    <input type="text" className="form-control" id="InputName" name="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="InputUsername">Username</label>
                    <input type="text" className="form-control" id="InputUsername" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="InputEmail">Email address</label>
                    <input type="email" className="form-control" id="InputEmail" name="email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="InputPassword">Password</label>
                    <input name="password" type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Signup;