import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
// import { useHistory } from 'react-router-dom';
import { Button, MenuItem, Slider, TextField, Typography } from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import './MakeBooking.css';

const MakeBooking = () => {
  // const history = useHistory();

  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [location, setLocation] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleContinue = () => {
    console.log({ numberOfPeople, location, selectedDate });
    // history.push('/select-table', { numberOfPeople, location, selectedDate });
  }

  const handleNumberOfPeopleChange = (_: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setNumberOfPeople(newValue[0]);
    } else {
      setNumberOfPeople(newValue)
    }
  }

  const marks: { value: number, label?: string }[] =
    [...Array(12).keys()].map(n => {
      if (n === 0) {
        return { value: 1, label: "1 person" }
      } else if (n === 11) {
        return { value: 12, label: "12 people" }
      } else {
        return { value: n }
      }
    });

  return (
    <div>
      {/* <NavBar/> */}
      <div className="component-container">
        <div className="booking-form-container">
          <Typography variant="h2">Booking</Typography>
          <form className="booking-form">
            <div>
              <Typography gutterBottom>Number of People</Typography>
              <Slider
                min={1}
                max={12}
                marks={marks}
                defaultValue={1}
                valueLabelDisplay="auto"
                onChange={handleNumberOfPeopleChange} />
            </div>
            <TextField
              select
              label="Location"
              variant="outlined"
              margin="normal"
              value={location}
              onChange={e => setLocation(e.target.value)}
            >
              {['A', 'B', 'C'].map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                label="Date and Time"
                inputVariant="outlined"
                margin="normal"
                value={selectedDate}
                onChange={setSelectedDate} />
            </MuiPickersUtilsProvider>
          </form>
          <div className="booking-footer">
            <Button
              color="secondary"
              onClick={handleContinue}
              size="large"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleContinue}
              size="large"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeBooking;
