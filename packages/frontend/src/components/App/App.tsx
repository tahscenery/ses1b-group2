import React, { Component } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import { Booking, Home, Locations, Login, SignUp, ViewMenu } from 'pages';
import Dashboard from '../../pages/component/Dashboard';
import './App.css';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

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

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router history={history}>
          <React.Fragment>
            <ThemeProvider theme={theme}>
              <Switch>
                {/* Home */}
                <Route exact path="/" component={Home} />

                {/* View Menu */}
                <Route exact path="/menu" component={ViewMenu} />

                {/* Locations */}
                <Route path="/locations" component={Locations} />

                {/* Sign Up */}
                <Route path="/register" component={SignUp} />

                {/* Login */}
                <Route path="/login" component={Login} />

                {/* Booking */}
                <Route path="/booking" component={Booking} />

                {/* Dashboard for Admin and Staff (WIP) */}
                <Route path="/dashboard" component={Dashboard} />

                {/* 404 */}
                <Route render={() => <Redirect to="/"/>} />
              </Switch>
            </ThemeProvider>
          </React.Fragment>
        </Router>
      </ApolloProvider>
    );
  };
}

export default App;
