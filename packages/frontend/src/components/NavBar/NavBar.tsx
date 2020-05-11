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
    this.state = { shouldShowMenu: false };
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState({ shouldShowMenu: !this.state.shouldShowMenu });
    const navBarMenu = document.getElementById('nav-bar-menu');

    if (navBarMenu !== null && navBarMenu !== undefined) {
      if (this.state.shouldShowMenu) {
        navBarMenu.classList.add('collapsed');
      } else {
        navBarMenu.classList.remove('collapsed');
      }
    }
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
                <IconButton color="primary" onClick={this.toggleMenu}><Menu/></IconButton>
              </span>
            </div>
            <nav id="nav-bar-menu" className="nav-bar-menu collapsed">
              <ul>
                <li><Button variant="outlined" color="primary" href="/menu">Menu</Button></li>
                <li><Button variant="outlined" color="primary" href="/locations">Locations</Button></li>
                <li><Button variant="outlined" color="primary" href="/register">Sign Up</Button></li>
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
