import React, { Fragment } from 'react';
import Date from './Context/DateTime';
import People from './Context/People';
import Location from './Context/Location';
import Table from './Table/Table';
import {
  Paper,
  CssBaseline,
  Grid,
  Typography
} from '@material-ui/core';

import './Booking.css';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

interface Row {
  id: string;
  tableNumber: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

interface TableData {
  allTables: Row[];
}

const GET_TABLE = gql`
query getTable{
  allTables{
    id
    tableNumber
    minCapacity
    maxCapacity
    description
  }
}`;

function Booking() {

  const query = useQuery<TableData>(GET_TABLE);

  return (
    <Grid container component="main" className="root">
      <CssBaseline />

      <Grid item xs={12} sm={8} md={3} component={Paper}>
        <div className="paper">
          <Typography component="h1" variant="h2" color="secondary" align="center">
            Booking
            </Typography>
          <form className="bookform">

            <Typography variant="h6" color="secondary">
              Date and Time
              </Typography>
            <Date />
            <People />
            <Location />
          </form>
        </div>
      </Grid>

      <Grid item xs={false} sm={4} md={9} component={Paper} elevation={10} square>
        <div className="paper">
          <Typography component="h1" variant="h2" color="primary">
            Table
            </Typography>
          <form className="table-form">
            <React.Fragment>
              <Table queryResult={query} />
            </React.Fragment>
          </form>
        </div>
      </Grid>
    </Grid>
  );

}

export default Booking;