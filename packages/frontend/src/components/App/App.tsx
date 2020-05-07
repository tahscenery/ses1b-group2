import React, { Component } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import * as colors from '@material-ui/core/colors'
import Home from 'pages/Home'
import Login from 'pages/Login';
import Booking from 'pages/Booking'

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: colors.amber
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

              {/* Login */}
              <Route path="/login" component={Login} />

              {/* Booking */}
              <Route path="/booking" component={Booking} />

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
