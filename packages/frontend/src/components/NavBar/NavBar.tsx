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
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    console.log('Here!');
    // this.props.setState({ shouldShowMenu: !this.state.shouldShowMenu });
  }

  render() {
    return (
      <div className="nav-bar-container">
        <div className="nav-bar">
          <div className="nav-bar-contents">
            <div className="nav-bar-persistent">
              <Typography variant="h1">
                <a href="/" className="nav-bar-brand-link">Sapori Unici</a>
              </Typography>
              <span className="nav-bar-collapse-icon">
                <IconButton color="primary"><Menu/></IconButton>
              </span>
            </div>
            <nav className="nav-bar-menu">
              <ul>
                <li><Button variant="outlined" color="primary" href="/menu">Menu</Button></li>
                <li><Button variant="outlined" color="primary" href="/locations">Locations</Button></li>
                <li><Button variant="outlined" color="primary" href="/login">Login</Button></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
