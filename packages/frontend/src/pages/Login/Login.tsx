import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import { Button, Checkbox, FormControlLabel, Link, TextField, Typography } from '@material-ui/core';
import gql from 'graphql-tag';

import './Login.css';
import NavBar from 'components/NavBar';

interface LoginResponse {
  Login: { accessToken: string; };
}

interface LoginParams {
  email: string;
  password: string;
}

import AuthContext from '../../context/authContext';

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
      accessToken
      userId
    }
  }
`;

export interface LoginMutation {
  accessToken: string;
  userId: string;
}

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  static contextType = AuthContext;

  componentDidMount() {
    document.title = 'Login – Sapori Unici';
  }

  const handleLoginUser = () => {
    if (!email.toUpperCase().match(/^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/g)) {
      throw new Error("Email field doesn't appear to be a valid email address");
    }

    if (password.length < 8) {
      throw new Error('Password must contain at least 8 characters');
    }

  render() {
    const { password, email } = this.state;
    return (
      <div>
        <NavBar />
        <div className="component-container">
          <div className="back">
            <div className="login-form">
              <Typography variant="h2">Login</Typography>
              <p>Sign in with your email and password below.</p>
              <Mutation<LoginMutation, LoginMutationVariables> mutation={loginMutation}>
                {mutate => (
                  <div
                    style={{
                      alignItems: "center",
                    }}>
                    <div>
                      <TextField
                        variant="outlined"
                        id="email"
                        label="Email"
                        autoComplete="email"
                        margin="normal"
                        fullWidth
                        required
                        autoFocus
                        value={email}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div>
                      <TextField
                        variant="outlined"
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        fullWidth
                        required
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div>
                      <FormControlLabel
                        label="Remember me"
                        control={<Checkbox value="remember" color="primary" />}
                      />
                      <Button
                        className="login-button"
                        type="submit"
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={async () => {
                          const response = await mutate({
                            variables: this.state
                          });
                          this.context.login("a", "a");
                          console.log(response);
                          if (response.data.accessToken!=null) {
                            this.context.login(response.data.accessToken, response.data.userId);
                          }
                          else {
                            console.log("error");
                          }
                        }}
                      >
                        Sign In
                    </Button>
                    </div>
                  </div>
                )}
              </Mutation>
              <div className="login-footer">
                <Link
                  href="#"
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
        <div className="back">
        <div className="login-form">
          <Typography variant="h2">Login</Typography>
          <p>Sign in with your email and password below.</p>
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
              href="#"
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
    </div>
  );
}

export default Login;
