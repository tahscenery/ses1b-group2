import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Checkbox, FormControlLabel, Link, TextField, Typography } from '@material-ui/core';
import gql from 'graphql-tag';

import './Login.css';
import AuthContext from 'context/authContext';
import Alert from 'components/Alert';

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

interface FormErrors {
  email: boolean;
  password: boolean;
}

const Login = () => {
  useEffect(() => {
    document.title = 'Login - Sapori Unici';
  }, []);

  const history = useHistory();
  const location = useLocation<{ didRedirect: boolean, from: { pathname: string } }>();
  const context = useContext(AuthContext);
  const { didRedirect, from } = location.state || { from: { pathname: "/" } };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({
    email: false,
    password: false,
  });

  const [loginUser, { error: loginError }] =
    useMutation<LoginResponse, LoginParams>(LOGIN_USER, {
      variables: { email, password }
    });

  const handleChange = (newValue: string, setter: (_: string) => void) => {
    setter(newValue);
    setErrors({ email: false, password: false });
  }

  const handleLoginUser = () => {
    if (!email.toUpperCase().match(/^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/g)) {
      setErrors({ ...errors, email: true });
      throw new Error("The provided email address doesn't appear to be a valid");
    }

    if (password.length === 0 || password.length < 8) {
      setErrors({ ...errors, password: true });
      throw new Error("Please input your password");
    }

    setErrors({ email: false, password: false });

    console.log('Logging user in...');
    loginUser()
      .then(response => {
        console.log(`DATA: ${JSON.stringify(response.data)}`);

        const isAdmin = (email: string) => {
          return (
            email === "admin@sapori-unici.com"
            || email === "staff1@sapori-unici.com"
            || email === "staff2@sapori-unici.com"
            || email === "staff3@sapori-unici.com"
          );
        }

        if (response.data) {
          const loginData = response.data.Login;
          context.login({
            accessToken: loginData.accessToken,
            userId: loginData.userId,
            isAdmin: isAdmin(email),
          });
          history.replace(from);
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
      setErrorMessage(error.message);
    }
  }

  const redirectMessage = "You must be logged in to view this page first.";

  return (
    <div className="component-container">
      <div className="login-form">
        <Typography variant="h2">Login</Typography>
        <p>Sign in with your email and password below.</p>
        {didRedirect ? <Alert severity="warning">{redirectMessage}</Alert> : null}
        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
        {loginError ? (
          loginError.graphQLErrors.map((error, index) => (
            <Alert key={`alert-${index}`} severity="error">{error.message}</Alert>
          ))
        ) : null}
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
            focused={errors.email}
            error={errors.email}
            onChange={e => handleChange(e.target.value, setEmail)}
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
            focused={errors.password}
            error={errors.password}
            onChange={e => handleChange(e.target.value, setPassword)}
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
  );
}

export default Login;
