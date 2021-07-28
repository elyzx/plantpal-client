import React from 'react';
// Material UI
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function RemindersToDo(props) {
    const {reminders, onWatering, classes} = props
    const options = {month: 'short', day: 'numeric'};
    return (
        <>
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
                                        {reminder.nextWatering}
                                        {/* {new Intl.DateTimeFormat('en-GB', options).format(reminder.nextWatering)} */}
                                    </TableCell>
                                    <TableCell align="right">
                                        To Do
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => onWatering(reminder._id)}>Done</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default RemindersToDo;