import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography
} from '@material-ui/core';

import './Login.css';
import NavBar from 'components/NavBar';
import AuthContext from 'context/authContext';

interface LoginResponse {
  Login: {
    accessToken: string;
    userId: string;
  };
}

interface LoginParams {
  email: string;
  password: string;
}

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
      accessToken
      userId
    }
  }
`;

const Login = () => {
  useEffect(() => {
    document.title = 'Login - Sapori Unici';
  }, []);

  // const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(AuthContext);

  const [loginUser, { error }] =
    useMutation<LoginResponse, LoginParams>(LOGIN_USER, {
      variables: { email, password }
    });

  const handleLoginUser = () => {
    if (!email.toUpperCase().match(/^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/g)) {
      throw new Error("Email field doesn't appear to be a valid email address");
    }

    if (password.length < 8) {
      throw new Error('Password must contain at least 8 characters');
    }

    console.log('Logging user in...');
    loginUser()
      .then(response => {
        console.log(`DATA: ${JSON.stringify(response.data)}`);
        if (response.data) {
          const loginData = response.data.Login;
          context.login(loginData.accessToken, loginData.userId);
        } else {
          console.log('Error: No data from response.');
        }
      })
      .catch(error => console.error(error))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      handleLoginUser();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <NavBar/>
      <div className="component-container">
        <div className="login-form">
          <Typography variant="h2">Login</Typography>
          <p>Sign in with your email and password below.</p>
          {error ? <p>(ERROR): {error.message}</p> : null}
          <form noValidate onSubmit={e => handleSubmit(e)}>
            <TextField
              variant="outlined"
              id="email"
              label="Email"
              autoComplete="email"
              margin="normal"
              fullWidth
              required
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              fullWidth
              required
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              label="Remember me"
              control={<Checkbox value="remember" color="primary"/>}
            />
            <Button
              className="login-button"
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              fullWidth
            >
              Sign In
            </Button>
          </form>
          <div className="login-footer">
            <Link
              href="/forgot-password"
              variant="body2"
              color="secondary"
            >
              Forgot Password?
            </Link>
            <Link
              href="/register"
              variant="body2"
              color="secondary"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
