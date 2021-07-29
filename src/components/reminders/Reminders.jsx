import React from 'react';
import RemindersToDo from './RemindersToDo';
import {Link} from 'react-router-dom';

// Material UI
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// Animation
import LottieControl from '../../animation/LottieControl.jsx'
import bigPlant from '../../animation/bigPlant.json';

const useStyles = makeStyles({
    title: {
        fontSize: '25px',
    },
    subtitle: {
        fontSize: '22px',
    },
    table: {
      minWidth: 500,
    },
});

function Reminders(props) {
    const {reminders, onWatering} = props
    const classes = useStyles();
    const options = {month: 'short', day: 'numeric'};
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const completeReminders = reminders.filter((reminder) => reminder.complete)
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, reminders.length - page * rowsPerPage);

    return (
        <Container>
            <div>
                <h1 className={classes.title}>🔔 Reminders 🔔 </h1>
            </div>
            <Grid spacing={2}>
                <Grid>
                    <h2 className={classes.subtitle}>To Do</h2>
                        <RemindersToDo classes={classes} reminders={reminders} onWatering={onWatering} />
                    <h2 className={classes.subtitle}>Done</h2>
                        <div className="flex-box">
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Plant</TableCell>
                                    <TableCell>Task</TableCell>
                                    <TableCell align="right">Date Due</TableCell>
                                    {/* <TableCell align="right">Status</TableCell> */}
                                    <TableCell align="right">Date Done 🙌</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {completeReminders
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                Done
                                            </TableCell> */}
                                            <TableCell align="right">
                                                {new Intl.DateTimeFormat('en-GB', options).format(reminder.wateredAt)}<p></p>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={completeReminders.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </Grid>
                <Grid className='padded'>
                    <LottieControl animation={bigPlant} width='40%'/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Reminders;