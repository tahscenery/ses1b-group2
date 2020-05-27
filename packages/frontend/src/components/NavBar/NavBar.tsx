import React, { useContext, useState } from 'react';
import { Button, IconButton, Typography } from '@material-ui/core'
import Menu from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close'

import './NavBar.css';

const NavBar = () => {
  const [shouldShowMenu, setShouldShowMenu] = useState(false);

  const toggleMenu = () => {
    setShouldShowMenu(!shouldShowMenu);
    const navBarMenu = document.getElementById('nav-bar-menu');

    if (navBarMenu) {
      if (shouldShowMenu) {
        navBarMenu.classList.add('collapsed');
      } else {
        navBarMenu.classList.remove('collapsed');
      }
    }
  }

  return (
    <div className="nav-bar-container">
      <div className="nav-bar">
        <div className="nav-bar-contents">
          <div className="nav-bar-persistent">
            <Typography variant="h1">
              <a href="/" className="nav-bar-brand-link">Sapori Unici</a>
            </Typography>
            <span className="nav-bar-collapse-icon">
              <IconButton color="primary" onClick={toggleMenu}>
                {shouldShowMenu ? <Close/> : <Menu/>}
              </IconButton>
            </span>
          </div>
          <nav id="nav-bar-menu" className="nav-bar-menu collapsed">
            <ul>
              <li><Button variant="outlined" color="primary" href="/menu">Our Menu</Button></li>
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

export default NavBar;
