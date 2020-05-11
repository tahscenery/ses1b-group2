import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import './Home.css';
import NavBar from 'components/NavBar';
// import Footer from 'components/Footer';

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="component-container">
          <Typography variant="h2">Unique is in our name</Typography>
          <img
            style={{ width: "100%", paddingTop: "20px" }}
            src={`https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80`}
            alt="image"
            />
        </div>
      </div>
    );
  }
}

export default Home;
