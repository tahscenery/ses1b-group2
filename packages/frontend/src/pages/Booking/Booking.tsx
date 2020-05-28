import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Table from './Table/Table';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Paper,
  CssBaseline,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';


import './Booking.css';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

interface Row {
  id: string;
  tableNumber: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

interface TableData {
  allTables: Row[];
}

const TABLE_QUERY = gql`
query TableQuery{
  allTables{
    id
    tableNumber
    minCapacity
    maxCapacity
    description
  }
}`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

function Booking() {

  const classes = useStyles();
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date | null>(new Date('2020-01-18T21:11:54'));
  //const [selectTable, setSelectedTable] = useState();

  const handleDateChange = (date: Date | null) => {
    setDate(date);
    console.log(date);
    console.log(numberOfPeople);
  };

  const query = useQuery<TableData>(TABLE_QUERY);

  return (
    <Grid container component="main" className="root">
      <CssBaseline />

      <Grid item xs={12} sm={8} md={3} component={Paper}>
        <div className="paper">
          <Typography component="h1" variant="h2" color="secondary" align="center">
            Booking
            </Typography>
          <form className="bookform">

            <Typography variant="h6" color="secondary">
              Date and Time
            </Typography>

            <DatePicker
              selected={date}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />

            <Typography variant="h6" color="secondary">
              Number of People
            </Typography>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="number">Number of People</InputLabel>
              <Select
                labelId="numberOfPeople"
                id="numberOfPeople"
                value={numberOfPeople}
                onChange={e => setNumberOfPeople(e.target.value as number)}
                label="Number of People">
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={17}>17</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={19}>19</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="h6" color="secondary">
              Location
            </Typography>

            <FormControl variant="outlined" style={{ minWidth: 160, margin: 'dense' }}>
              <InputLabel id="location">Location</InputLabel>
              <Select
                labelId="location"
                id="location"
                value={location}
                onChange={e => setLocation(e.target.value as string)}
                label="location"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={1}>A</MenuItem>
                <MenuItem value={2}>B</MenuItem>
                <MenuItem value={3}>C</MenuItem>
              </Select>
            </FormControl>

          </form>
        </div>
      </Grid>

      <Grid item xs={false} sm={4} md={9} component={Paper} elevation={10} square>
        <div className="paper">
          <Typography component="h1" variant="h2" color="primary">
            Table
            </Typography>
          <form className="table-form">
            <React.Fragment>
              <Table queryResult={query}/>
            </React.Fragment>
          </form>
        </div>

        <Button variant="outlined">Next</Button>
      </Grid>
    </Grid>
  );

}

export default Booking;