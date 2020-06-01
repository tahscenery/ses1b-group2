import React from 'react';
import { Button, Link, TextField, Typography } from '@material-ui/core';
import './Login.css';
import NavBar from 'components/NavBar';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";

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
    password: "bryan1",
    accessToken: "",
    userId: ""
  };

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  static contextType = AuthContext;

  render() {
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
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      
                        <TextField
                          variant="outlined"
                          id="email"
                          label="Email"
                          autoComplete="email"
                          margin="normal"
                          fullWidth
                          required
                          autoFocus
                          error={true}
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      
                      
                        <TextField
                          variant="outlined"
                          id="password"
                          label="Password"
                          autoComplete="password"
                          type="password"
                          margin="normal"
                          fullWidth
                          required
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      
                      <div>
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
                            var text = JSON.stringify(response, function (key, value) {
                              if (key == "accessToken") {
                                return value.toUpperCase();
                              } else {
                                return value;
                              }
                            });
                            this.setState({accessToken: text });
                            console.log(this.state.email);
                            console.log(this.state.userId);
                            console.log(this.state.accessToken);
                            console.log(JSON.stringify(response.data.accessToken));
                            console.log(JSON.stringify(response.data.userId));
                            this.context.login("a", "a");

                          }}>
                          Sign In
                        </Button>
                      </div>
                    </div>
                  )}
                </Mutation>
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
        </div>
    );
  }
}

export default Login;
