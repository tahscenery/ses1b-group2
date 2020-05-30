import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

import './MakeBooking.css';
import BookingContext, { BookingDetails, CurrentProgress } from 'context/bookingContext';
import SelectDetails from './pages/SelectDetails';
import SelectItems from './pages/SelectItems';
import SelectTable from './pages/SelectTable';

const MakeBooking = () => {
  const [currentProgress, _setCurrentProgress] = useState(CurrentProgress.SELECT_DETAILS);
  const [bookingDetails, _setBookingDetails] = useState<BookingDetails>({});

  const setCurrentProgress = (progress: CurrentProgress) => {
    console.log(`Setting progress: ${progress}`);
    _setCurrentProgress(progress);
  }

  const setBookingDetails = (details: BookingDetails) => {
    console.log({ ...bookingDetails, ...details });
    _setBookingDetails({ ...bookingDetails, ...details });
  }

  const currentComponent = () => {
    switch (currentProgress) {
      case CurrentProgress.SELECT_DETAILS:
        return (<SelectDetails/>)
      case CurrentProgress.SELECT_TABLE:
        return (<SelectTable/>)
      case CurrentProgress.SELECT_ITEMS:
        return (<SelectItems/>)
      default:
        return (<SelectDetails/>)
    }
  }

  return (
    <div>
      <div className="component-container">
        <BookingContext.Provider
          value={{
            currentProgress,
            bookingDetails,
            setCurrentProgress,
            setBookingDetails
          }}
        >
          {currentComponent()}
        </BookingContext.Provider>
      </div>
    </div>
  );
}

export default MakeBooking;
