import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import RemindersToDo from './RemindersToDo';

// Material UI
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// Theme
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function Dashboard(props) {
    const {plants, reminders, onWatering, weather, temper} = props;
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        weather()
    }, [])

    // const plantAlive = () => {
    //   let arrPlantsAlive = plants.map((plant, i) => {
    //         return(
    //             <div key={i}>
    //                 <p>{plant}</p>
    //             </div>
    //         )
    //     })
    //     return <p>{arrPlantsAlive.length}</p>
    // }

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
                    <h1>Dashboard</h1>
                    <Link to='/plants/create'><Button color='secondary'>Add Plant</Button></Link>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>{<h3>Total Plants: {plantTotal()}</h3>}</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>{<h3>Alive Plants: {plantsAlive()}</h3>}</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}><h3>Deceased Plants: {plantsDead()}</h3></Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}><h3>Plant Waterings: {completedReminders()}</h3></Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            Next Reminders
                            <RemindersToDo classes={classes} reminders={reminders} onWatering={onWatering}/> 
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>Weather Forecast: { temper } °C</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>Plant Gallery</Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Dashboard;