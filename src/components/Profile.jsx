import React, {useState, useEffect }from 'react';
import axios from 'axios';

// Material UI
import Container from '@material-ui/core/Container';

function Profile(props) {
    const {isLoggedIn, onEdit, onDeleteUser} = props
    const [profileDetails, setProfileDetails] = useState([]);

    useEffect(() => {
        fetchProfileDetails();
    }, []);
    
    const fetchProfileDetails = async () => {
        try {
            let userId = props.match.params.userId
            console.log(props.match.params)
            let response = await axios.get(`http://localhost:5005/api/profile/${userId}`, {withCredentials: true});
            setProfileDetails(response.data);
        }
        catch (err) {
            console.log('Profile details fetch failed', err)
        }
    };

    const handleNameChange = (event) => {
        let newName = event.target.value;
        setProfileDetails({...profileDetails, name: newName});
    }

    const handleUsernameChange = (event) => {
        let newUsername = event.target.value;
        setProfileDetails({...profileDetails, username: newUsername})
    }

    const handleEmailChange = (event) => {
        let newEmail = event.target.value;
        setProfileDetails({...profileDetails, email: newEmail})
    }

    return (
        <Container>
            <div>
                <h1>Profile Details</h1>
                <p>Login status: {isLoggedIn.toString()}</p>
                <form onSubmit={(event) => {onEdit(event, setProfileDetails)}}>
                    <div className="form-group">
                        <label htmlFor="InputName">Name</label>
                        <input onChange={handleNameChange} value={profileDetails.name} type="text" className="form-control" id="InputName" name="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputUsername">Username</label>
                        <input onChange={handleUsernameChange} value={profileDetails.username} type="text" className="form-control" id="InputUsername" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputEmail">Email address</label>
                        <input onChange={handleEmailChange} value={profileDetails.email} type="email" className="form-control" id="InputEmail" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputPassword">Previous Password</label>
                        <input name="password" type="password" className="form-control" id="password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputPassword">New Password</label>
                        <input name="password" type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
                <button onClick={onDeleteUser}>Delete account</button>
            </div>
        </ Container>
    );
};

export default Profile;