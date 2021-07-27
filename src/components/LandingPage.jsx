import React from 'react';

// Material UI
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <h1>Your plant's hydration pal</h1>
                        <p>Never forget to water your plant again </p>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>xs=12 sm=6</Paper>
                </Grid>
            </Grid>
        </ Container>
    );
};

export default LandingPage;