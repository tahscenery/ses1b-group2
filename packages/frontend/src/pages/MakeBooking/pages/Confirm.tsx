import React, { useContext } from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './Confirm.css';
import AuthContext from 'context/authContext';
import BookingContext, { BookingDetails, CurrentProgress } from 'context/bookingContext';

const useStyles = makeStyles({
  tableEmphasis: {
    fontWeight: "bold",
  }
});

const handlePayment = (bookingDetails: BookingDetails) => {
  console.log(bookingDetails);
  console.log("handlePayment: TODO...");
  return Promise.resolve();
}

const Confirm = () => {
  // const authContext = useContext(AuthContext);
  const bookingContext = useContext(BookingContext);
  const bookingDetails = bookingContext.bookingDetails;

  const styles = useStyles();

  const handlePrevious = () => {
    bookingContext.setCurrentProgress(CurrentProgress.SELECT_ITEMS);
  }

  const handleConfirm = () => {
    handlePayment(bookingDetails)
      .then(_ => console.log("TODO..."))
      .catch(error => console.error(`An error occurred: ${error}`));
  }

  let total = 0;
  for (const item of bookingDetails.selectedItems) {
    total += item.price;
  }

  return (
    <div className="booking-form-container">
      <Typography variant="h2">Confirm your details</Typography>
      <p>Please review your booking details below. You may go back to change any details.</p>
      <div>
        <div className="booking-form-summary-table">
          <Typography variant="h3">Booking details</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow key="number-of-people">
                  <TableCell className={styles.tableEmphasis} component="th">
                    Number of People
                  </TableCell>
                  <TableCell>{bookingDetails.numberOfPeople} people</TableCell>
                </TableRow>

                <TableRow key="location">
                  <TableCell className={styles.tableEmphasis} component="th">
                    Location
                  </TableCell>
                  <TableCell>{bookingDetails.location}</TableCell>
                </TableRow>

                <TableRow key="date-and-time">
                  <TableCell className={styles.tableEmphasis} component="th">
                    Date and Time
                  </TableCell>
                  <TableCell>{bookingDetails.selectedDate.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="booking-form-summary-table">
          <Typography variant="h3">Table details</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow key="table-number">
                  <TableCell className={styles.tableEmphasis} component="th">
                    Table Number
                  </TableCell>
                  <TableCell>{bookingDetails.selectedTable.tableNumber}</TableCell>
                </TableRow>

                <TableRow key="table-capacity">
                  <TableCell className={styles.tableEmphasis} component="th">
                    Description
                  </TableCell>
                  <TableCell>
                    Suitable for {bookingDetails.selectedTable.minCapacity}&nbsp;
                    to {bookingDetails.selectedTable.maxCapacity} people
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="booking-form-summary-table">
          <Typography variant="h3">Selected items</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {bookingDetails.selectedItems.map((item, index) => (
                  <TableRow key={`item-${index}`}>
                    <TableCell component="th">{item.name}</TableCell>
                    <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className={styles.tableEmphasis} align="right">
                    Total
                  </TableCell>
                  <TableCell className={styles.tableEmphasis} align="right">
                    ${total.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
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
          size="large"
          onClick={handleConfirm}
        >
          Confirm and Pay
        </Button>
      </div>
    </div>
  )
}

export default Confirm;
