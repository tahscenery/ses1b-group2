import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import AuthContext from 'context/authContext';

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const { user } = useContext(AuthContext);
  const isAuthenticated = user !== null && user !== undefined;

  return (
    <Route {...rest} render={({ location }) =>
      isAuthenticated ? (
        children
      ) : (
        <Redirect to={{ pathname: "/login", state: { didRedirect: true, from: location } }}/>
      )
    }/>
  );
}

export default PrivateRoute;
