import React, { useState } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

import './App.css';
import NavBar from 'components/NavBar';
import PrivateRoute from 'components/PrivateRoute';
import AuthContext, { User } from 'context/authContext';
import { Admin, Dashboard, ForgotPassword, FourOFour, Home, Login, Locations, MakeBooking, SignUp, ViewMenu } from 'pages';

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
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
});

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/menu" component={ViewMenu} />
      <Route path="/locations" component={Locations} />
      <Route path="/register" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />

      <PrivateRoute path="/make-booking"><MakeBooking/></PrivateRoute>
      <PrivateRoute path="/dashboard"><Dashboard/></PrivateRoute>
      <PrivateRoute path="/admin"><Admin/></PrivateRoute>

      <Route component={FourOFour} />
    </Switch>
  );
}

const App = () => {
  const getUserFromLocalStorage: () => User | null = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }

  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    history.push("/logout");
  }

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ user, login, logout }}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <NavBar />
            <Routes />
          </Router>
        </ThemeProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
