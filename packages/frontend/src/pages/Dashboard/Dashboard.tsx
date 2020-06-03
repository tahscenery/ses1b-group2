import React, { useContext, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Slider, TextField, Typography } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import gql from 'graphql-tag';

import './Dashboard.css';
import AuthContext from 'context/authContext';
import ItemList from 'components/ItemList';
import Alert from 'components/Alert';

interface Booking {
  id: string;
  date: Date;
  location: string;
  numberOfPeople: number;
  totalPrice: number;
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
      totalPrice
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
  const { id, date: _date, location, numberOfPeople, totalPrice } = props.booking;
  const date = new Date(_date.toString());

  const [isEditing, setIsEditing] = useState(false);

  // eslint-disable-next-line
  const [deleteOrder, {}] =
    useMutation<deleteOrder, deleteOrderVariables>(DELETE_BOOKINGS, {
      variables: { id: id }
    });

  const marks: { value: number, label?: string }[] =
    [...Array(12).keys()].map(n => {
      const index = n + 1;
      if (index === 1) {
        return { value: 1, label: "1 person" }
      } else if (index === 12) {
        return { value: 12, label: "12 people" }
      } else {
        return { value: index }
      }
    });


  if (isEditing) {
    return (
      <div className="dashboard-edit">
        <div>
          <Typography gutterBottom>Number of People</Typography>
          <Slider
            min={1}
            max={12}
            marks={marks}
            value={numberOfPeople}
            valueLabelDisplay="auto"
            onChange={() => {}} />
        </div>
        <TextField
          select
          label="Location"
          variant="outlined"
          margin="normal"
          value={location}
          onChange={() => {}}
        >
          <MenuItem key={`menu-item-1`} value={'Ultimo'}>{'Ultimo'}</MenuItem>
          <MenuItem disabled key={`menu-item-2`} value={'- Coming soon -'}>{'- Coming Soon -'}</MenuItem>
        </TextField>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            label="Date and Time"
            inputVariant="outlined"
            margin="normal"
            value={date}
            onChange={() => {}} />
        </MuiPickersUtilsProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {}}>
          Apply
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={_ => setIsEditing(false)}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <>
      <ListItem
        button
        key={`list-item-${props.index}`}>
        <ListItemAvatar>
          <Avatar>{location.charAt(0)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          key={`list-item-text-${props.index}`}
          primary={`${location} - ${numberOfPeople} people ($${totalPrice.toFixed(2)})`}
          secondary={date.toLocaleString()}/>
        <Button
          variant="outlined"
          color="secondary"
          onClick={_ => setIsEditing(true)}>
          Edit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={_ => deleteOrder()}>
          Cancel
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

  const generateRows = (results: BookingsData) => {
    console.log(results);

    if (results.allOrdersForUser.length === 0) {
      return (<Alert severity="info">You have not made any bookings.</Alert>)
    } else {
      return (results.allOrdersForUser
        .sort((prev, curr) => prev.date < curr.date ? -1 : prev.date > curr.date ? 1 : 0)
        .map((booking, index) => (
          <>
            <BookingsListRow index={index} booking={booking} />
            <Divider/>
          </>
        )))
    }
  }

  return (
    <div className="component-container">
      <div className="booking-form-container">
        <Typography variant="h2">My Bookings</Typography>
        <p>Below is a list of all your bookings. You can cancel or edit your
          bookings from here.</p>
        {didCreateOrder ? (
          <Alert severity="success">Your booking has been successfully created.</Alert>
        ) : null}
        <List>
          <Divider/>
          <ItemList queryResult={queryResult} numberOfLoadingCards={4}>
            {results => generateRows(results)}
          </ItemList>
        </List>
        <div className="booking-footer">
          <Button
            variant="contained"
            color="primary"
            href="/make-booking"
          >
            New Booking
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
