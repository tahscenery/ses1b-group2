import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import NavBar from 'components/NavBar'

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="component-container">
          <Typography variant="h1">Home</Typography>
        </div>
      </div>
    );
  }
}

export default Home;
