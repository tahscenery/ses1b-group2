import React, { useContext, useState } from 'react';
import { Button, Typography } from '@material-ui/core';

import BookingContext, { CurrentProgress } from 'context/bookingContext';

const SelectItems = () => {
  const context = useContext(BookingContext);

  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);

  const handlePrevious = () => {
    context.setCurrentProgress(CurrentProgress.SELECT_TABLE);
  }

  const handleNext = () => {
    context.setBookingDetails({ selectedItems });
    context.setCurrentProgress(CurrentProgress.SELECT_DETAILS);
  }

  return (
    <div className="booking-form-container">
      <Typography variant="h2">Select Items</Typography>
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

export default SelectItems;
