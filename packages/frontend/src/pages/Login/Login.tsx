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
    email: "",
    password: ""
  };

  handleChange = (e: any) => {
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
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <div>
                      <input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div>
                      <button
                        onClick={async () => {
                          const response = await mutate({
                            variables: this.state
                          });
                          console.log(response);
                          this.props.history.push("/booking");
                        }}
                      >
                        login
                      </button>
                    </div>
                  </div>
                )}
              </Mutation>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
