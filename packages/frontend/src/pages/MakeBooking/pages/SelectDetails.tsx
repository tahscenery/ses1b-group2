import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { Button, MenuItem, Slider, TextField, Typography } from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import BookingContext, { CurrentProgress } from 'context/bookingContext';

const SelectDetails = () => {
  const context = useContext(BookingContext);
  const history = useHistory();

  const [numberOfPeople, setNumberOfPeople] = useState(context.bookingDetails.numberOfPeople || 1);
  const [location, setLocation] = useState<string | null>(context.bookingDetails.location || null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(context.bookingDetails.selectedDate || null);

  const handleCancel = () => {
    history.push("/dashboard")
  }

  const handleNext = () => {
    context.setBookingDetails({ numberOfPeople, location, selectedDate });
    context.setCurrentProgress(CurrentProgress.SELECT_TABLE);
  }

  const handleNumberOfPeopleChange = (_: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setNumberOfPeople(newValue[0]);
    } else {
      setNumberOfPeople(newValue);
    }
  }

  const marks: { value: number, label?: string }[] =
    [...Array(12).keys()].map(n => {
      const index = n + 1;
      if (index === 1) {
        return { value: 1, label: "1 person" }
      } else if (index === 12) {
        return { value: 12, label: "12 people" }
      } else {
        return { value: index }
      }
    });

  return (
    <div className="booking-form-container">
      <Typography variant="h2">Make a booking</Typography>
      <p>To start a booking, fill in the details below.</p>
      <form className="booking-form" onSubmit={e => e.preventDefault()}>
        <div>
          <Typography gutterBottom>Number of People</Typography>
          <Slider
            min={1}
            max={12}
            marks={marks}
            value={numberOfPeople}
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
          <MenuItem key={`menu-item-1`} value={'Ultimo'}>{'Ultimo'}</MenuItem>
          <MenuItem disabled key={`menu-item-2`} value={'- Coming soon -'}>{'- Coming Soon -'}</MenuItem>
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
          onClick={handleCancel}
          size="large"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleNext}
          disabled={(location === null || location === undefined) || (selectedDate === null || selectedDate === undefined)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default SelectDetails;
