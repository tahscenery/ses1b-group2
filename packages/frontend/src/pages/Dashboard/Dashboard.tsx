import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
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

export interface deleteOrder {
  deleteOrder: boolean;
}

export interface deleteOrderVariables {
  id: string;
}

const DELETE_BOOKINGS = gql`
  mutation deleteOrder($id: String!) {
    deleteOrder(id: $id)
  }
`;

interface BookingsListRowProps {
  index: number;
  booking: Booking;
}

const BookingsListRow = (props: BookingsListRowProps) => {
  const { date: _date, location, numberOfPeople, id } = props.booking;
  const date = new Date(_date.toString());

  const [deleteOrder, {}] =
    useMutation<deleteOrder, deleteOrderVariables>(DELETE_BOOKINGS, {
      variables: { id: id }
    });

  return (
    <>
      <ListItem
        button
        key={`list-item-${props.index}`}>
        <ListItemAvatar>
          <Avatar>{`${props.index}`}</Avatar>
        </ListItemAvatar>
        <ListItemText
          key={`list-item-text-${props.index}`}
          primary={`${location} - ${numberOfPeople} people`}
          secondary={date.toLocaleString()}/>
        <Divider />
        <Button
          variant="contained"
          color="primary"
          onClick={_ => deleteOrder()}>
          Cancel Booking
        </Button>
      </ListItem>

    </>
  );
}

const Dashboard = () => {
  const location = useLocation<{ didCreateOrder: boolean }>();
  const { user } = useContext(AuthContext);
  const queryResult = useQuery<BookingsData>(GET_BOOKINGS, {
    variables: { userId: user.userId }
  });

  let didCreateOrder = false;
  if (location.state !== undefined) {
    didCreateOrder = location.state.didCreateOrder;
  }

  return (
    <div className="component-container">
      <Typography variant="h2">My Bookings</Typography>
      {didCreateOrder ? (
        <Alert severity="info">Your booking has been successfully created.</Alert>
      ) : null}
      <List>
        <ItemList queryResult={queryResult} numberOfLoadingCards={4}>
          {results => results.allOrdersForUser
            .sort((prev, curr) => prev.date < curr.date ? -1 : prev.date > curr.date ? 1 : 0)
            .map((booking, index) => (
              <BookingsListRow index={index} booking={booking} />
            ))}
        </ItemList>
      </List>
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
