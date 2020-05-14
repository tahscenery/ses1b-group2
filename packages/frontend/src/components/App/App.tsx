import React, { Component } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import { Booking, Home, Login, SignUp, ViewMenu,  } from 'pages';
import Dashboard from '../../pages/component/Dashboard';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffc107',
      light: '#fff350',
      dark: '#c79100',
      contrastText: '#000000'
    },
    secondary: {
      main: '#424242',
      light: '#6d6d6d',
      dark: '#1b1b1b',
      contrastText: '#ffffff'
    }
  },
  typography: {
    fontFamily: 'Source Sans Pro',
    button: {
      fontSize: '1rem',
    },
    h1: {
      fontFamily: 'Playfair Display',
      fontSize: '3rem',
      fontWeight: 900,
      '@media screen and (max-width: 780px)': {
        fontSize: '2.5rem'
      }
    },
    h2: {
      fontFamily: 'Playfair Display',
      fontSize: '2.5rem',
      fontWeight: 900,
      '@media screen and (max-width: 780px)': {
        fontSize: '2rem'
      }
    },
    h3: {
      color: '#424242',
      fontFamily: 'Playfair Display',
      fontSize: '1.5rem',
      fontWeight: 700,
      '@media screen and (max-width: 780px)': {
        fontSize: '1.3rem'
      }
    }
  }
})

const history = createBrowserHistory();

class App extends Component {
  render () {
    return (
      <Router history={history}>
        <React.Fragment>
          <ThemeProvider theme={theme}>
            <Switch>
              {/* Home */}
              <Route exact path="/" component={Home} />

              {/* View Menu */}
              <Route exact path="/menu" component={ViewMenu} />

              {/* Login */}
              <Route path="/login" component={Login} />

              {/* Sign Up */}
              <Route path="/register" component={SignUp} />

              {/* Booking */}
              <Route path="/booking" component={Booking} />

              {/* Dashboard for Admin and Staff ON GOING */}
              <Route path="/dashboard" component={Dashboard} />

              {/* 404 */}
              <Route render={() => <Redirect to="/"/>} />
            </Switch>
          </ThemeProvider>
        </React.Fragment>
      </Router>
    );
  };
}

export default App;
