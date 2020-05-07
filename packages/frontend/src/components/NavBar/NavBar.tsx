import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core'

import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar-container">
        <div className="nav-bar-contents">
          <Typography variant="h1">
            <a href="/" className="nav-bar-brand-link">Sapori Unici</a>
          </Typography>
          <nav className="nav-bar">
            <ul>
              <li><Button variant="outlined" color="primary" href="/menu">Menu</Button></li>
              <li><Button variant="outlined" color="primary">Locations</Button></li>
              <li><Button variant="outlined" color="primary" href="/login">Login</Button></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default NavBar;
