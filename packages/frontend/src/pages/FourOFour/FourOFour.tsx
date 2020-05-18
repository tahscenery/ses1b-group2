import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import NavBar from 'components/NavBar';

class FourOFour extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="component-container">
          <Typography variant="h2">Uh-oh…</Typography>
          <p>You weren't supposed to see this <span role="img" aria-label="emoji" >😅</span></p>
        </div>
      </div>
    )
  }
}

export default FourOFour;
