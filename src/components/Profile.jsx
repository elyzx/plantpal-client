import React, {useState, useEffect} from 'react';
import axios from 'axios';

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function Profile(props) {
    const { onEdit, onDeleteUser, user} = props
    const [profileDetails, setProfileDetails] = useState([]);

    useEffect(() => {
        fetchProfileDetails();
    }, []);
    
    const fetchProfileDetails = async () => {
        try {
            let response = await axios.get(`http://localhost:5005/api/profile`, {withCredentials: true});
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
                <div className='flex-box'>
                    <h1>Hi there, {user.username}!</h1>
                </div>
                
                <div className='flex-box'>
                    <p>Edit your profile details using the form below.</p>
                </div>

                <div className='flex-box'>
                    <form onSubmit={(event) => {onEdit(event, profileDetails)}}>
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
                        <button type="submit" className="btn btn-primary"><Button>Save</Button></button>
                    </form>
                </div>
                <div className='flex-box'>
                    <button onClick={onDeleteUser}><Button>Delete account</Button></button>
                </div>
            </div>
        </Container>
    );
};

export default Profile;