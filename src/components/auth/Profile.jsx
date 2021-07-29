import React, {useState, useEffect} from 'react';

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function Profile(props) {
    const { onEdit, onDeleteUser, user} = props
    const [profileDetails, setProfileDetails] = useState(user);

    useEffect(() => {
        setProfileDetails(user);
    }, [user]);

    const style = {
        background: 'linear-gradient(45deg, #6bfea1 30%, #6bfede 90%)',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginTop: '20px'
      };

      const space = {
        marginTop: '15px',
    }

    const handleChangeDetails = (event) => 
        setProfileDetails({
            ...profileDetails,
            [event.target.name]: event.target.value,
        });

    return (
        <Container>
            { user && (
                <div>
                    <div className='flex-box'>
                        <h1>Hi there, {user.name}! 💚 </h1>
                    </div>
                
                    <div className='flex-box'>
                        <p>Edit your profile details using the form below.</p>
                    </div>

                    <div className='flex-box'>
                        <form onSubmit={onEdit}>
                            <div  style={space} className="form-group">
                                <label htmlFor="InputName">Name</label>
                                <input style={space} onChange={handleChangeDetails} value={profileDetails.name} type="text" className="form-control" id="InputName" name="name" />
                            </div>
                            <div style={space} className="form-group">
                                <label htmlFor="InputUsername">Username</label>
                                <input style={space} onChange={handleChangeDetails} value={profileDetails.username} type="text" className="form-control" id="InputUsername" name="username" />
                            </div>
                            <div style={space} className="form-group">
                                <label htmlFor="InputEmail">Email address</label>
                                <input style={space} onChange={handleChangeDetails} value={profileDetails.email} type="email" className="form-control" id="InputEmail" name="email" />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="InputPassword">Previous Password</label>
                                <input name="password" type="password" className="form-control" id="password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="InputPassword">New Password</label>
                                <input name="password" type="password" className="form-control" id="password" />
                            </div> */}
                            <Button style={style} type="submit" className="btn btn-primary">Save</Button>
                        </form>
                    </div>
                    <div className='flex-box padded'>
                        <Button onClick={onDeleteUser}>Delete account</Button>
                    </div>
            </div>
            )}
        </Container>
    );
};

export default Profile;