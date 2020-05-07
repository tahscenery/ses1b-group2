import React, { Component } from 'react';

import NavBar from 'components/NavBar'
import { Typography } from '@material-ui/core';

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
