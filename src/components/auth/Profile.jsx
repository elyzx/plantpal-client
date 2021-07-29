import React, {useState, useEffect} from 'react';

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Profile(props) {
    const { onEdit, onDeleteUser, user} = props
    const [profileDetails, setProfileDetails] = useState(user);

    useEffect(() => {
        setProfileDetails(user);
    }, [user]);

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

    // handle form value changes
    const handleChangeDetails = (event) => 
        setProfileDetails({
            ...profileDetails,
            [event.target.name]: event.target.value,
        });
    
    // handle pop up to confirm delete
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (!user){
        return 'Loading...'
    }

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
                            <div className='flex-box'>
                                <Button style={style} type="submit" className="btn btn-primary">Save</Button>
                            </div>
                        </form>
                    </div>
                    <div className='flex-box padded'>
                        <Button onClick={handleClickOpen}>Delete account</Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete your account?
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>
                                Go Back
                            </Button>
                            <Button onClick={onDeleteUser} autoFocus>
                                Delete Account
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
            </div>
            )}
        </Container>
    );
};

export default Profile;