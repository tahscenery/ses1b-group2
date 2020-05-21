import React, { Component } from 'react';
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

import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
      accessToken
    }
  }
`;

export interface LoginMutation {
  accessToken: string;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

class Login extends React.PureComponent<RouteComponentProps<{}>> {

  componentDidMount() {
    document.title = 'Login – Sapori Unici';
  }

  state = {
    email: "bryancolin35@ymail.com",
    password: "bryan"
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

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
                          console.log(response);
                          this.props.history.push("/booking");
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

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
