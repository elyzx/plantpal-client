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

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

function Reminders(props) {
    const {reminders, onWatering} = props
    const classes = useStyles();

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
                            <TableCell>Date Due</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Update</TableCell>
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
                                    <TableCell>
                                        {reminder.nextWatering}
                                    </TableCell>
                                    <TableCell>
                                        {reminder.complete.toString()}
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => onWatering(reminder._id)}>Done</button>
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
                            <TableCell>Date Due</TableCell>
                            <TableCell>Date Completed</TableCell>
                            {/* <TableCell>Update</TableCell> */}
                            {/* Edit reminder frequency? */}
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
                                    <TableCell>
                                        {reminder.nextWatering}
                                    </TableCell>
                                    <TableCell>
                                        {reminder.wateredAt}
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