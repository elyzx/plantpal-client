import axios from 'axios';
import React from 'react';

// Material UI
import Container from '@material-ui/core/Container';


function Dashboard(props) {
    const {isLoggedIn, plants} = props

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

  
    return (
        <Container>
            <div>
                <h1>Dashboard</h1>
                <p> Login status: {isLoggedIn.toString()}</p>
            <Container>
                {
                        <div>
                            <h1>Plants: {plantTotal()}</h1>
                            <h1>Plants not Alive: {plantsDead()} </h1>
                            <h1>Plants Alive: {plantsAlive()} </h1>
                        </div>

                    }
            </Container>
            </div>
        </ Container>
    );
};

export default Dashboard;