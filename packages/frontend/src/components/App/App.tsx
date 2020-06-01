import React, { Component } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import { Booking, FourOFour, Home, Locations, LoginOld, SignUp, ViewMenu, Payment } from 'pages';
import Dashboard from '../../pages/component/Dashboard';
import './App.css';

import Forgot from '../../pages/ForgotPassword/Forgot';

import AuthContext from '../../context/authContext';

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

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'http://localhost:4000/graphql', /* credentials: 'include' */ }),
});

interface Props {
  accessToken: string,
  userId: string
}

class App extends React.Component<{}, Props> {

  constructor(props: Props) {
    super(props);
    this.state = {
      accessToken: null,
      userId: null
    };
  }


  login = (accessToken: string, userId: string) => {
    this.setState({ accessToken: accessToken, userId: userId});
  };

  logout = () => {
    this.setState({ accessToken: null, userId: null });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router history={history}>
          <React.Fragment>
            <AuthContext.Provider
              value={{
                accessToken: this.state.accessToken,
                userId: this.state.userId,
                login: this.login,
                logout: this.logout
              }}
            >
              <ThemeProvider theme={theme}>
                <Switch>
                  {!this.state.accessToken && <Redirect from="/" to="/login" exact />}
                  {this.state.accessToken && <Redirect from="/" to="/payment" exact />}
                  {this.state.accessToken && <Redirect from="/login" to="/payment" exact />}

                  {/* Home */}
                  {this.state.accessToken && (
                  <Route exact path="/home" component={Home} />
                  )}

                  {/* View Menu */}
                  <Route exact path="/menu" component={ViewMenu} />

                  {/* Locations */}
                  <Route path="/locations" component={Locations} />

                  {/* Payment */}
                  <Route path="/payment" component={Payment} />

                  {/* Sign Up */}
                  {!this.state.accessToken && (
                  <Route path="/register" component={SignUp} />
                  )}

                  {/* Login */}
                  {!this.state.accessToken && (
                  <Route path="/login" component={LoginOld} />
                  )}

                  {/* Forgot Password */}
                  {!this.state.accessToken && (
                  <Route path="/forgot-password" component={Forgot}/>
                  )}

                  {/* Booking */}
                  {this.state.accessToken && (
                  <Route path="/booking" component={Booking} />
                  )}

                  {/* Dashboard for Admin and Staff (WIP) */}
                  {!this.state.accessToken && (
                  <Route path="/dashboard" component={Dashboard} />
                  )}

                  {/* 404 */}
                  <Route component={FourOFour} />
                </Switch>
              </ThemeProvider>
            </AuthContext.Provider>
          </React.Fragment>
        </Router>
      </ApolloProvider>
    );
  };
}

export default App;
