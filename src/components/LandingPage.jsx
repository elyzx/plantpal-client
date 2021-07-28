import React from 'react';

// Material UI
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Animation
import LottieControl from '../animation/LottieControl.jsx'
import plantGrows from '../animation/plantGrows.json';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

function LandingPage(props) {
    const classes = useStyles();

    return (
        <Container>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                      <h1>Your plant's hydration pal</h1>
                      <p>Keep track of all your plant’s watering schedule with PlantPal</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LottieControl animation={plantGrows} width='70%'/>
                </Grid>
            </Grid>
        </ Container>
    );
};

export default LandingPage;