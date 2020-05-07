import React, { Component } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from 'pages/Home'
import Login from 'pages/Login';
import Booking from 'pages/Booking'

import './App.css';

const history = createBrowserHistory();

class App extends Component {
  render () {
    return (
      <Router history={history}>
        <React.Fragment>
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
        </React.Fragment>
      </Router>
    );
  };
}

export default App;
