import React, { useContext, useState } from 'react';
import { Button, Typography } from '@material-ui/core';

import BookingContext, { CurrentProgress } from 'context/bookingContext';

const SelectTable = () => {
  const context = useContext(BookingContext);

  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const handlePrevious = () => {
    context.setCurrentProgress(CurrentProgress.SELECT_DETAILS);
  }

  const handleNext = () => {
    context.setBookingDetails({ selectedTable });
    context.setCurrentProgress(CurrentProgress.SELECT_ITEMS);
  }

  return (
    <div className="booking-form-container">
      <Typography variant="h2">Select Table</Typography>
      <form className="booking-form">
        {/* Todo... */}
      </form>
      <div className="booking-footer">
        <Button
          color="secondary"
          onClick={handlePrevious}
          size="large"
        >
          Previous
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleNext}
          size="large"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default SelectTable;
