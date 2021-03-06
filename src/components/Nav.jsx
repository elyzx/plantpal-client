import React, { useEffect } from 'react';
import {Link as RouterLink} from  'react-router-dom';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { green, blue } from '@material-ui/core/colors';

// Icons
import LocalFloristSharpIcon from '@material-ui/icons/LocalFloristSharp';
import FormatListBulletedSharpIcon from '@material-ui/icons/FormatListBulletedSharp';
import BarChartSharpIcon from '@material-ui/icons/BarChartSharp';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));


function Nav(props) {
    const {onLogOut, isLoggedIn, user} = props
    const classes = useStyles();
    const drawerClasses = makeStyles({
        list: {
            width: 250,
        },
    })
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [drawerOpen, toggleDrawer] = React.useState(false);
    const open = Boolean(anchorEl);
    const drawerIsOpen = Boolean(drawerOpen);
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  
    useEffect(() => {
        return () => {
            toggleDrawer(false)
        }
    }, [])

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const onLogoutAndClose = () => {
        handleClose()
        onLogOut()
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    { user && (
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                            onClick={() => isLoggedIn && toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                <Typography variant="h6" className={classes.title}>
                    <Link component={RouterLink} to='/' color='inherit'>PlantPal</Link>
                </Typography>

                {
                    user && (
                        <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS}
                            anchor={'left'}
                            open={drawerIsOpen}
                            onClose={() => toggleDrawer(false)}
                            onOpen={() => toggleDrawer(true)}>
                            <div className={drawerClasses.list}>
                                <List></List>
                                <List>
                                    <ListItem button component={RouterLink} to='/'>
                                        <ListItemIcon><HomeIcon style={{ color: blue[500]}}/> </ListItemIcon>
                                        <ListItemText>PlantPal</ListItemText>
                                    </ListItem>
                                </List>
                                <List>
                                    <Divider />
                                </List>
                                <List>
                                    <ListItem button component={RouterLink} to='/dashboard'>
                                        <ListItemIcon><BarChartSharpIcon style={{ color: green[500]}} /> </ListItemIcon>
                                        <ListItemText>Dashboard</ListItemText>
                                    </ListItem>
                                    <ListItem button component={RouterLink} to='/plants'>
                                        <ListItemIcon><LocalFloristSharpIcon style={{ color: green[500]}}/> </ListItemIcon>
                                        <ListItemText>Plants</ListItemText>
                                    </ListItem>
                                    <ListItem button component={RouterLink} to='/reminders'>
                                        <ListItemIcon><FormatListBulletedSharpIcon style={{ color: green[500]}} /> </ListItemIcon>
                                        <ListItemText>Reminders</ListItemText>
                                    </ListItem>
                                </List>
                                <List>
                                    <Divider />
                                </List>
                                <List>
                                    <ListItem button component={RouterLink} to={`/profile/${user._id}`}>
                                        <ListItemIcon><AccountCircle style={{ color: blue[500]}}/> </ListItemIcon>
                                        <ListItemText> {user.username} </ListItemText>
                                    </ListItem>
                                    <ListItem button onClick={onLogoutAndClose}>
                                        <ListItemIcon><ExitToAppIcon style={{ color: blue[500]}}/> </ListItemIcon>
                                        <ListItemText>Sign out</ListItemText>
                                    </ListItem>
                                </List>
                            </div>
                        </SwipeableDrawer>
                    )
                }
                {isLoggedIn ? (
                    <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                    {
                        user && (
                            <MenuItem button component={RouterLink} to={`/profile/${user._id}`} onClick={handleClose}>Profile</MenuItem>
                        )
                    }
                        <MenuItem onClick={onLogoutAndClose}>Sign out</MenuItem>
                    </Menu>
                    </div>
                )
                : ( 
                    <div>
                        <Link button component={RouterLink} to='/login' color='inherit'><Button>Login</Button></Link>
                        <Link button component={RouterLink} to='/signup' color='inherit'><Button>Signup</Button></Link>
                    </div>
                )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Nav;