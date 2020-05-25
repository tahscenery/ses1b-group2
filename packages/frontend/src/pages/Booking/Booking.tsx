import React, { Component } from 'react';
import Date from './Context/DateTime';
import People from './Context/People';
import Location from './Context/Location';
import {
  Paper,
  CssBaseline,
  Grid,
  Typography
} from '@material-ui/core';

import './Booking.css';





function Booking() {

  
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
            <form className="form">
            </form>
          </div>
        </Grid>
      </Grid>
    );
  
}

export default Booking;