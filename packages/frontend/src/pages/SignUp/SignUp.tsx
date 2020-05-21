import React, { Component } from 'react';
import {
  Button,
  Link,
  TextField,
  Typography
} from '@material-ui/core';

import './SignUp.css';
import NavBar from 'components/NavBar';

import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";


const registerMutation = gql`
  mutation RegisterMutation($name: String!, $email: String!, $password: String!) {
    Register(name: $name, email: $email, password: $password)
  }
`;

interface RegisterMutation {
  register: boolean;
}

interface RegisterMutationVariables {
  email: string;
  password: string;
}

class SignUp extends React.PureComponent<RouteComponentProps<{}>> {
  state = {
    name: "",
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
    const { password, email, name } = this.state;
    return (
      <div>
      <NavBar/>
      <Mutation<RegisterMutation, RegisterMutationVariables>
        mutation={registerMutation}
      >
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
              name="name"
              placeholder="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
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
                this.props.history.push("/login");
              }}
            >
              register
            </button>
          </div>
        </div>
        )}
      </Mutation>
      </div>
    );
  }
}

export default SignUp;

/*
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
              name="name"
              placeholder="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
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
                this.props.history.push("/login");
              }}
            >
              register
            </button>
          </div>
        </div>
*/