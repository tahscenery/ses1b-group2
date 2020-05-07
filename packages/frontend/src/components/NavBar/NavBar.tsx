import React, { Component } from 'react';
import { Button, IconButton, Typography } from '@material-ui/core'
import Menu from '@material-ui/icons/Menu';

import './NavBar.css';

interface NavBarProps {}

interface NavBarState {
  shouldShowMenu: boolean;
}

class NavBar extends Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);
    this.state = { shouldShowMenu: true };
  }

  toggleMenuItemsVisibility() {
    this.setState({ shouldShowMenu: !this.state.shouldShowMenu });
  }

  render() {
    return (
      <div className="nav-bar-container">
        <div className="nav-bar-contents">
          <Typography variant="h1">
            <a href="/" className="nav-bar-brand-link">Sapori Unici</a>
          </Typography>
          <nav className="nav-bar-collapsed">
            <IconButton color="primary">
              <Menu/>
            </IconButton>
          </nav>
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
