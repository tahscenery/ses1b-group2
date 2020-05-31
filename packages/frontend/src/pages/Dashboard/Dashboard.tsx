import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Paper } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AuthContext from 'context/authContext';
import BookingContext, { BookingDetails, CurrentProgress } from 'context/bookingContext';

interface allOrder {
  id: string;
  location: string;
}

interface Order {
  order: allOrder[];
}

interface OrderVariable {
  id: string;
}

const GET_ORDER = gql`
query order($id: String!){
  order(id: $id)
  {
    id
    location
  }
}`;

const useStyles = makeStyles({
  tableEmphasis: {
    fontWeight: "bold",
  }
});


const Dashboard = () => {
  const location = useLocation<{ didCreateOrder: boolean }>();

  const authContext = useContext(AuthContext);
  const bookingContext = useContext(BookingContext);
  const bookingDetails = bookingContext.bookingDetails;

  const { data } = useQuery<Order, OrderVariable>(GET_ORDER, { variables: { id: "5ed3b9e0cab1462dad2b207e" } });

  const styles = useStyles();

  return (
    <div className="component-container">
      <Typography variant="h2">Dashboard</Typography>
      <div className="booking-form-summary-table">
        <Typography variant="h3">Booking details</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow key="number-of-people">
                <TableCell className={styles.tableEmphasis} component="th">
                  Booking id
                  </TableCell>
                <TableCell> test</TableCell>
                <TableCell> people</TableCell>
                <TableCell> people</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Dashboard;
