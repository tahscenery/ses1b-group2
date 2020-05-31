import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
// import { useLocation } from 'react-router-dom';
import { Button, Paper, Typography } from '@material-ui/core';
import gql from 'graphql-tag';

import AuthContext from 'context/authContext';
import ItemList from 'components/ItemList';
import Alert from 'components/Alert';

interface Booking {
  id: string;
  date: Date;
  location: string;
  numberOfPeople: number;
  items: string[];
}

interface BookingsData {
  allOrdersForUser: Booking[];
}

const GET_BOOKINGS = gql`
  query getOrders($userId: String!) {
    allOrdersForUser(userId: $userId) {
      id
      date
      location
      numberOfPeople
      items
    }
  }
`;

interface BookingsListRowProps {
  booking: Booking;
}

const BookingsListRow = (props: BookingsListRowProps) => {
  const { id, date, location, numberOfPeople, items } = props.booking;
  return (
    <Paper>
      <p>{id}</p>
      <p>{date}</p>
      <p>{location}</p>
      <p>{numberOfPeople}</p>
      <p>{JSON.stringify(items)}</p>
    </Paper>
  );
}

const Dashboard = () => {
  // const location = useLocation<{ didCreateOrder?: boolean }>();
  const { user } = useContext(AuthContext);
  const queryResult = useQuery<BookingsData>(GET_BOOKINGS, {
    variables: { userId: user.userId }
  });

  return (
    <div className="component-container">
      <Typography variant="h2">My Bookings</Typography>
      <ItemList queryResult={queryResult} numberOfLoadingCards={4}>
        {results => results.allOrdersForUser.map((booking, index) => (
          <BookingsListRow key={index} booking={booking} />
        ))}
      </ItemList>
      <Button
        variant="contained"
        color="primary"
        href="/make-booking"
      >
        Make a Booking
      </Button>
    </div>
  )
}

export default Dashboard;
