import React from 'react';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import './PageLayout.css';

function MyPlants(props) {

    const {isLoggedIn, plants, onSearch} = props
    console.log(plants)

    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
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
         else{
            return <h2>Not Alive</h2>
         }
      }

    return (
        <>
           
                <div>
                Hello I'm all your plants
                <p> Login status: {isLoggedIn.toString()}</p>
                <Link to='/plants/create'>Add Plant</Link>
                </div>

                <div>
                    <input onChange={onSearch} type="text" placeholder="Search.."/>
                </div>

            <div className="body-container">

       
    

                {
                    plants.map((plant, i) => {
                        return(

                            <div key={i} className="plants-direction">

                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={plant.photo}
                                            title={plant.name}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {plant.name}
                                                </Typography>
                                            </CardContent>
                                            <CardContent className='isAlive-margin'>
                                            { 
                                                live(plant) 
                                                
                                            }
                                            </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Link to={`/plants/${plant._id}`}>
                                            <Button size="small" color="primary">
                                                Details
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
  
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
};

export default MyPlants;