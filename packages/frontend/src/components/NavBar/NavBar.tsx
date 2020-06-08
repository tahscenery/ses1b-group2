import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, IconButton, Typography } from '@material-ui/core'
import Menu from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close'

import './NavBar.css';
import AuthContext from 'context/authContext';

const NavBar = () => {
  const history = useHistory();
  const context = useContext(AuthContext);

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

  const handleSignOut = () => {
    context.logout();
    console.log('Logged out');
    history.push('/login');
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
              {context.user ? (
                <>
                  {context.user.isAdmin ? (
                    <li><Button variant="outlined" color="primary" href="/admin">Admin</Button></li>
                  ) : (
                    <li><Button variant="outlined" color="primary" href="/dashboard">My Bookings</Button></li>
                  )}
                  <li><Button variant="outlined" color="primary" onClick={handleSignOut}>Sign Out</Button></li>
                </>
              ) : (
                <>
                  <li><Button variant="outlined" color="primary" href="/register">Sign Up</Button></li>
                  <li><Button variant="outlined" color="primary" href="/login">Login</Button></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
