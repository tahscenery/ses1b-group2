import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import NavBar from 'components/NavBar';
import { DatePicker } from 'material-ui';

const SelectTable = () => {
  const location = useLocation<{
    numberOfPeople: number,
    location: string,
    date: Date
  }>();

  const [selectedTable, setSelectedTable] = useState<string>(null);

  const handleContinue = () => {
    const history = useHistory();
    history.push('/select-items', {
      numberOfPeople: location.state.numberOfPeople,
      location: location.state.location,
      date: location.state.date,
      selectedTable
    })
  }

  return (
    <div>
      <NavBar/>
      <div className="component-container">
        {/* Load all the tables. On click, set the current `selectedTable` as
            the selected table's id */}
        <Button onClick={() => handleContinue()}>Continue</Button>
      </div>
    </div>
  );
}

export default SelectTable;
