import React from 'react';
import {Redirect} from 'react-router-dom';

function Login(props) {
    const {onLogIn, isLoggedIn} = props
    if (isLoggedIn) {
        return <Redirect to={'/dashboard'} />
    }
    return (
        <div>
            Hello I'm the login form
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
        </div>
    );
};

export default Login;