import React, {useState, useEffect} from 'react';
import axios from 'axios';

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function Profile(props) {
    const { onEdit, onDeleteUser, user} = props
    console.log('user', user)
    // const [userDetails, updatedUserDetails] = useState(user)
    const [profileDetails, setProfileDetails] = useState(user);

    useEffect(() => {
        setProfileDetails(user);
    }, []);
    
    // const fetchProfileDetails = async () => {
    //     try {
    //         let response = await axios.get(`http://localhost:5005/api/profile`, {withCredentials: true});
    //         setProfileDetails(response.data);
    //     }
    //     catch (err) {
    //         console.log('Profile details fetch failed', err)
    //     }
    // };

    const handleChangeDetails = (event) => 
        setProfileDetails({
            ...profileDetails,
            [event.target.name]: event.target.value,
        });

    // const handleNameChange = (event) => {
    //     let newName = event.target.value;
    //     setProfileDetails({...user, name: newName});
    // }

    // const handleUsernameChange = (event) => {
    //     let newUsername = event.target.value;
    //     setProfileDetails({...user, username: newUsername})
    // }

    // const handleEmailChange = (event) => {
    //     let newEmail = event.target.value;
    //     setProfileDetails({...user, [event.target.name]: newEmail})
    // }

    return (
        <Container>
            <div>
                { user && (
                    <div className='flex-box'>
                        <h1>Hi there, {user.username}!</h1>
                    </div>
                )}
                
                <div className='flex-box'>
                    <p>Edit your profile details using the form below.</p>
                </div>

                <div className='flex-box'>
                    <form onSubmit={onEdit}>
                        <div className="form-group">
                            <label htmlFor="InputName">Name</label>
                            <input onChange={handleChangeDetails} value={profileDetails.name} type="text" className="form-control" id="InputName" name="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputUsername">Username</label>
                            <input onChange={handleChangeDetails} value={profileDetails.username} type="text" className="form-control" id="InputUsername" name="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputEmail">Email address</label>
                            <input onChange={handleChangeDetails} value={profileDetails.email} type="email" className="form-control" id="InputEmail" name="email" />
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="InputPassword">Previous Password</label>
                            <input name="password" type="password" className="form-control" id="password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputPassword">New Password</label>
                            <input name="password" type="password" className="form-control" id="password" />
                        </div> */}
                        <Button type="submit" className="btn btn-primary">Save</Button>
                    </form>
                </div>
                <div className='flex-box'>
                    <Button onClick={onDeleteUser}>Delete account</Button>
                </div>
            </div>
        </Container>
    );
};

export default Profile;