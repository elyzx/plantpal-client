import React from 'react';
import {Link as RouterLink} from  'react-router-dom';

// Material UI
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

// Animation
import LottieControl from '../animation/LottieControl.jsx'
import plantGrows from '../animation/plantGrows.json';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

function LandingPage(props) {
    const {user} = props
    const classes = useStyles();

    return (
        <Container className='align-center padded'>
              <Grid container spacing={3} className='padded'>
                <Grid item xs={12} sm={6}>
                    
                      <h1>🌱 Your plant's hydration pal</h1>
                      <p>Keep track of all your plant’s watering schedule with PlantPal.</p>
                      <h4>To get started:</h4>
                        <p>🪴 Create an account and add your plants</p>
                        <p>📅 Define how often they need watering</p>
                        <p>📊 View your stats in the dashboard</p>
                        <p>💧 Stick to your watering schedule</p>
                        <p>✅ Tick off reminders to create the next</p>
                        <p>💀 Update the health status of each plant</p>
                      <div className='flex-box padded'>
                          {!user && (
                            <>
                              <Link button component={RouterLink} to='/login' color='inherit'><Button className='padded'>Login</Button></Link>
                              <Link button component={RouterLink} to='/signup' color='inherit'><Button className='padded'>Signup</Button></Link>
                            </>
                          )}
                      </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LottieControl animation={plantGrows} />
                </Grid>
            </Grid>
        </ Container>
    );
};

export default LandingPage;