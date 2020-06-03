import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Paper, Typography } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import gql from 'graphql-tag';

import './Confirm.css';
import AuthContext from 'context/authContext';
import BookingContext, { BookingDetails, CurrentProgress } from 'context/bookingContext';

interface CreateOrderParams {
  userId: string;
  tableId: string;
  date: Date;
  location: string;
  numberOfPeople: number;
  items: string[];
  totalPrice: number;
}

interface CreateOrderResponse {
  createOrder: boolean;
}

const CREATE_ORDER = gql`
  mutation createOrder(
    $userId: String!,
    $tableId: String!,
    $date: DateTime!,
    $location: String!,
    $numberOfPeople: Float!,
    $totalPrice: Float!,
    $items: [String!]!
  ) {
    createOrder(data: {
      userId: $userId,
      tableId: $tableId,
      date: $date,
      location: $location,
      numberOfPeople: $numberOfPeople,
      totalPrice: $totalPrice,
      items: $items
    })
  }
`;

export interface CreateSubscriptionMutation_createSubcription {
  __typename: "User";
  id: string;
  email: string;
}

export interface CreateSubscriptionMutation {
  createSubcription: CreateSubscriptionMutation_createSubcription;
}

export interface CreateSubscriptionMutationVariables {
  source: string;
  id: string;
}

const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscriptionMutation($source: String!, $id: String!) {
    createSubcription(source: $source, id: $id) {
      id
      email
    }
  }
`;

const useStyles = makeStyles({
  tableEmphasis: {
    fontWeight: "bold",
  }
});

const Confirm = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const bookingContext = useContext(BookingContext);
  const bookingDetails = bookingContext.bookingDetails;

  // eslint-disable-next-line
  const [createOrder, {}] =
    useMutation<CreateOrderResponse, CreateOrderParams>(CREATE_ORDER);

  // const [pay] = useMutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(CREATE_SUBSCRIPTION);

  const styles = useStyles();

  const handlePrevious = () => {
    bookingContext.setCurrentProgress(CurrentProgress.SELECT_ITEMS);
  }

  const handleToken = (token: Token) => {
    console.log(token);

    const variables = {
      userId: authContext.user.userId,
      tableId: bookingDetails.selectedTable.id,
      date: bookingDetails.selectedDate,
      location: bookingDetails.location,
      numberOfPeople: bookingDetails.numberOfPeople,
      totalPrice: bookingDetails.totalPrice,
      items: bookingDetails.selectedItems.map(item => item.id),
    };

    console.log(variables);

    createOrder({ variables })
      .then(res => {
        console.log(`DATA: ${JSON.stringify(res.data)}`);
        if (res.data.createOrder) {
          history.push('/dashboard', { didCreateOrder: true });
        } else {
          console.error(`Failed to create order`);
        }
      })
      .catch(error => {
        console.error(`An error occurred: ${error}`);
        history.push('/dashboard', { didCreateOrder: true });
      });
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
        <StripeCheckout
          stripeKey="pk_test_uAMIN59vqRuzrMicoGTAyacQ00EKaAXDAl"
          name="Sapori Unici"
          token={token => handleToken(token)}
          billingAddress
          shippingAddress
          amount={total * 100}
        />
      </div>
    </div>
  )
}

export default Confirm;
