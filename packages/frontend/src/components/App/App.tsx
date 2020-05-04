import React, { Component } from 'react';

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import Login from '../../pages/Login/Login';
import Booking from '../../pages/Booking/Booking';


class App extends Component {
  render () {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Redirect from="/" to="/booking" exact ></Redirect>
          <Route path="/login" component={Login} />
          <Route path="/booking" component={Booking} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
  };
}

export default App;
