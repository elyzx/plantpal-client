import React from 'react';
import {Link} from 'react-router-dom';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useTheme } from '@material-ui/core/styles';

function MyPlants(props) {
    const {plants, onSearch} = props
    const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            maxWidth: '100%',
        },
        search: {
            maxWidth: '350px',
        },
        card: {
            margin: 10, 
        },
        media: {
            height: 140,
            width: 200,
        },
    });
    const classes = useStyles();

    const live = (v) => {
        if (v.isAlive === true){
            return <h2>Alive</h2>
        }
        else {
            return <h2>Deceased</h2>
        }
    };

    return (
        <Container>
            <div className={classes.root}>

                <div className="space-between">
                    <div className='flex-start'>
                        <h1>My Plants</h1>
                        <div className='padded'>
                            <Link to='/plants/create'><Button color='secondary'>Add Plant</Button></Link>
                        </div>
                    </div>
                    <div className="flex-end">
                        <input onChange={onSearch} type="text" placeholder="Search.." className={classes.search}/>
                    </div>
                </div>

                <div className="flex-box">
                    {plants
                    .map((plant, i) => {
                        return (
                            <div key={i}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={plant.photo}
                                            title={plant.name} />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">{plant.name}</Typography>
                                        </CardContent>
                                        <CardContent className='isAlive-margin'>{live(plant)}</CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Link to={`/plants/${plant._id}`}>
                                            <Button size="small" color="primary">Details</Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </ Container>
    );
};

export default MyPlants;