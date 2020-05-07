import React, { Component } from 'react';
import { Button } from '@material-ui/core'

import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar-container">
        <h1 className="nav-bar-brand-title">Sapori Unici</h1>
        <nav className="nav-bar">
          <ul>
            <li><Button variant="outlined" color="primary">Menu</Button></li>
            <li><Button variant="outlined" color="primary">Locations</Button></li>
            <li><Button variant="outlined" color="primary">Login</Button></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
