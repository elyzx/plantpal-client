import React from 'react';
import {Link} from 'react-router-dom';

// Material UI
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

    const style = {
        background: 'linear-gradient(45deg, #C8FACC 30%, #FFF6CE 90%)',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 40,
        padding: '0 30px',
      };

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
                            {/* <TableCell align="right">Status</TableCell> */}
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
                                        <Link to={`/plants/${reminder.plant._id}`}>
                                            <Button>{reminder.plant.name}</Button>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        Water Me!
                                    </TableCell>
                                    <TableCell align="right">
                                        {new Intl.DateTimeFormat('en-GB', options).format(reminder.nextWatering)}
                                    </TableCell>
                                    {/* <TableCell align="right">
                                        To Do
                                    </TableCell> */}
                                    <TableCell align="right">
                                        <Button style={style} onClick={() => onWatering(reminder._id)}>Done</Button>
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