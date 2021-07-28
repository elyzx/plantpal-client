import React from 'react';

// Material UI
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import LottieControl from './LottieControl.jsx'

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

function LandingPage(props) {
    const classes = useStyles();

    return (
        <Container>
             <h1>Your plant's hydration pal</h1>
             <p>Keep track of all your plant’s watering schedule with PlantPal. </p>
             <LottieControl />
        </ Container>
    );
};

export default LandingPage;