import React from 'react';
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
import {Link as RouterLink} from  'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// material-ui icons
import LocalFloristSharpIcon from '@material-ui/icons/LocalFloristSharp';
import FormatListBulletedSharpIcon from '@material-ui/icons/FormatListBulletedSharp';
import BarChartSharpIcon from '@material-ui/icons/BarChartSharp';
import LibraryBooksSharpIcon from '@material-ui/icons/LibraryBooksSharp';
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';

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

function TopNav(props) {
    const {onLogOut, isLoggedIn} = props
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
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                    onClick={() => isLoggedIn && toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    PlantPal
                </Typography>
                <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS}
                    anchor={'left'}
                    open={drawerIsOpen}
                    onClose={() => toggleDrawer(false)}
                    onOpen={() => toggleDrawer(true)}>
                    <div className={drawerClasses.list}>
                        <List>
                        {['Dashboard', 'Plants'].map((text, index) => (
                            <ListItem button key={text}>
                            <Link></Link>
                            <ListItemIcon>{index % 2 === 0 ? <BarChartSharpIcon /> : <LocalFloristSharpIcon /> }</ListItemIcon>
                            <ListItemText primary={text} />
                            </ListItem>
                        ))}
                        </List>
                        <Divider />
                        <List>
                        {['Tasks', 'Guides'].map((text, index) => (
                            <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <FormatListBulletedSharpIcon /> : <LibraryBooksSharpIcon /> }</ListItemIcon>
                            <ListItemText primary={text} />
                            </ListItem>
                        ))}
                        </List>
                        <Divider />
                        <List>
                        {['Settings'].map((text, index) => (
                            <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <SettingsSharpIcon /> : <SettingsSharpIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                            </ListItem>
                        ))}
                        </List>
                    </div>
                </SwipeableDrawer>
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
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={onLogoutAndClose}>Sign out</MenuItem>
                    </Menu>
                    </div>
                )
                : ( 
                    <div>
                        <Link component={RouterLink} to='/login' color='inherit'>Login</Link>
                        <Link component={RouterLink} to='/signup' color='inherit'>Signup</Link>
                    </div>
                )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default TopNav;