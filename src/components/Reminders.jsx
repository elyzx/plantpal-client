import React from 'react';

// Material UI
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
});

function Reminders(props) {
    const {reminders, onWatering} = props
    const classes = useStyles();
    const options = {month: 'short', day: 'numeric'};

    return (
        <Container>
            <div>
                <h1>Reminders</h1>
            </div>
            <h2>To Do</h2>
            <div className="flex-box">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Plant</TableCell>
                            <TableCell>Task</TableCell>
                            <TableCell align="right">Date Due</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Change Status</TableCell>
                            {/* Edit reminder frequency? */}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {reminders
                            .filter((reminder) => !reminder.complete)
                            .map((reminder, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {reminder.plant.name}
                                        {/* could we link to the plant details page? */}
                                    </TableCell >
                                    <TableCell>
                                        Water Me!
                                    </TableCell>
                                    <TableCell align="right">
                                        {new Intl.DateTimeFormat('en-GB', options).format(reminders.nextWatering)}
                                    </TableCell>
                                    <TableCell align="right">
                                        To Do
                                    </TableCell>
                                    <TableCell align="right">
                                        <button onClick={() => onWatering(reminder._id)}><Button>Done</Button></button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <h2>Done</h2>
                        <div className="flex-box">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Plant</TableCell>
                            <TableCell>Task</TableCell>
                            <TableCell align="right">Date Due</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Date Changed</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {reminders
                            .filter((reminder) => reminder.complete)
                            .map((reminder, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {reminder.plant.name}
                                        {/* could we link to the plant details page? */}
                                    </TableCell >
                                    <TableCell>
                                        Water Me!
                                    </TableCell>
                                    <TableCell align="right">
                                        {new Intl.DateTimeFormat('en-GB', options).format(reminders.nextWatering)}
                                    </TableCell>
                                    <TableCell align="right">
                                        Done
                                    </TableCell>
                                    <TableCell align="right">
                                        {new Intl.DateTimeFormat('en-GB', options).format(reminders.wateredAt)}
                                    </TableCell>
                                    {/* <TableCell>
                                        <button onClick={() => onWatering(reminder._id)}>Done</button>
                                    </TableCell> */}
                                </TableRow>
                            )
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    )
}

export default Reminders;