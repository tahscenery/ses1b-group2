import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { DatePicker } from 'material-ui';
import NavBar from 'components/NavBar';

const Booking = () => {
  const history = useHistory();

  const [numberofPeople, setNumberOfPeople] = useState(0);
  const [location, setLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleContinue = () => {
    history.push('/select-table', { numberofPeople, location, selectedDate });
  }

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  }

  return (
    <div>
      <NavBar/>
      <div className="component-container">
        <TextField label="number" variant="outlined" onChange={e =>
          setNumberOfPeople(Number(e.target.value))
        }/>
        <TextField label="location" variant="outlined" onChange={e => setLocation(e.target.value)}/>
        <DatePicker onChange={handleDateChange} />
        <Button onClick={() => handleContinue()}>Continue</Button>
      </div>
    </div>
  );
}

export default Booking;
