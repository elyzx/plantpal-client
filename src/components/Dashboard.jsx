import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import RemindersToDo from './reminders/RemindersToDo';

// Material UI
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

// Animation
import LottieControl from '../animation/LottieControl.jsx'
import plantJson from '../animation/hangingPlant.json';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
        fontSize: '25px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: 'theme.palette.text.secondary',
    },
    paperGreen: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'theme.palette.text.secondary',
        backgroundColor: '#C8FACC',
        height: 100,
    },
    paperGreenWithoutHeight: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'theme.palette.text.secondary',
        backgroundColor: '#C8FACC',
    },
    paperBlue: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'theme.palette.text.secondary',
        backgroundColor: '#D1F2FF',
        height: 100,
    },
    paperBlueWithoutHeight: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'theme.palette.text.secondary',
        backgroundColor: '#D1F2FF',
        minHeight: '50.046772684752106vh',
    },
    paperYellow: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'theme.palette.text.secondary',
        backgroundColor: '#FFF6CE',
        height: 100,
    },
    paperYellowWithoutHeight: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'theme.palette.text.secondary',
        backgroundColor: '#FFF6CE',
        minHeight: '50.046772684752106vh',
    },
    paperRed: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'theme.palette.text.secondary',
        backgroundColor: '#FFE6D9',
        height: 100,
    },
    gallery: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        overflow: 'hidden',
        backgroundColor: '#C8FACC',
    },
    image: {
        width: '100%',
        height: 200,
        objectFit: 'cover',
    }
  }));

function Dashboard(props) {
    const {user, plants, reminders, onWatering, weather, temper} = props;
    const classes = useStyles();

    useEffect(() => {
        weather()
    }, [])

    const plantTotal = () => {
        let arrPlantsDead = plants.map((plant, i) => {
                return(
                
                    <div key={i}>
                        <p>{plant}</p>
                    </div>
                )  
          })
          
          return <p>{arrPlantsDead.length}</p>
      }

    const plantsDead = () => {
        let arrPlantsDead = plants.filter((plant, i) => {
            return plant.isAlive === false;  
        })
        return <p>{arrPlantsDead.length}</p>
    }

    const plantsAlive = () => {
        let arrPlantsAlive = plants.filter((plant, i) => {
            return plant.isAlive === true;  
        })
        return <p>{arrPlantsAlive.length}</p>
    }

      const completedReminders = () => {
        let completedReminders = reminders.filter((reminders, i) => {
            return reminders.complete === true;
        })
        return <p>{completedReminders.length}</p>
      }
  
    return (
        <Container>
            <div className={classes.root}>
                <div className="space-between">
                    <h1 className={classes.title}>✨ Dashboard ✨</h1>
                    <Link to='/plants/create'><Button>Add Plant</Button></Link>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paperGreen}>{<h3>Total Plants: {plantTotal()}</h3>}</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paperBlue}>{<h3>Alive Plants: {plantsAlive()}</h3>}</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paperYellow}><h3>Waters Logged: {completedReminders()}</h3></Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paperRed}><h3>Deceased Plants: {plantsDead()}</h3></Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paperYellowWithoutHeight}>
                            <h4>Next Reminders</h4>
                            <RemindersToDo classes={classes} reminders={reminders} onWatering={onWatering}/> 
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paperBlueWithoutHeight}>
                        <LottieControl animation={plantJson} width='61%'/>
                            <h3>Current Temperature ☀️</h3>
                            <h3>{ temper } °C</h3>
                            <div className='padded'>
                                <Link to={`/profile/${user._id}`}><Button>Change Location</Button></Link>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>

                        <Paper className={classes.paperGreenWithoutHeight}>
                            <h4>Plant Gallery</h4>
                            <div className={classes.gallery}>
                            <ImageList className={classes.gallery} cols={3}>
                                {plants.map((plant) => (
                                <ImageListItem className={classes.image} key={plant.img} cols={plant.cols || 1}>
                                    <img src={plant.photo} alt={plant.title} />
                                </ImageListItem>
                                ))}
                                
                            </ImageList>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Dashboard;