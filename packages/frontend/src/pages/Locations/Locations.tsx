import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import NavBar from 'components/NavBar';

class Locations extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="component-container">
          <Typography variant="h2">Locations</Typography>
          <p>Our locations...</p>
        </div>
      </div>
    )
  }
}

export default Locations;
