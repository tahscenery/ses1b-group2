import React, { Component } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@material-ui/core';

import './ForgotPassword.css';

import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";

import {resetMutation, resetMutationVariables} from '../../schemaTypes';

const ResetMutation = gql`
  mutation resetMutation($email: String!, $password: String!) {
    ResetPassword(email:$email, password:$password)
  }
`;

class ForgotPassword extends React.PureComponent<RouteComponentProps<{}>> {
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
    // return (
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //     <div className="back">
    //       <Mutation<resetMutation, resetMutationVariables> mutation={ResetMutation}>
    //         {mutate => (
    //           <div
    //             style={{
    //               paddingTop: "150px",
    //               display: "flex",
    //               flexDirection: "column",
    //             }}
    //           >
    //             <Typography component="h1" variant="h2" color="primary">
    //               Forgot Password
    //             </Typography>
    //             <Typography component="h1" variant="subtitle1" color="initial">
    //               Input a new password
    //             </Typography>
    //             <TextField
    //               variant="outlined"
    //               margin="normal"
    //               required
    //               fullWidth
    //               id="email"
    //               label="Email Address"
    //               name="email"
    //               autoComplete="email"
    //               autoFocus
    //               value={this.state.email}
    //               onChange={this.handleChange}
    //             />
    //             <TextField
    //               variant="outlined"
    //               margin="normal"
    //               required
    //               fullWidth
    //               id="password"
    //               label="New Password"
    //               name="password"
    //               autoComplete="password"
    //               autoFocus
    //               value={this.state.password}
    //               onChange={this.handleChange}
    //             />
    //             <div
    //             style={{
    //               paddingTop: "20px"}}
    //             ></div>
    //             <Button
    //               type="submit"
    //               fullWidth
    //               variant="contained"
    //               color="primary"
    //               className="button"
    //               onClick={async () => {
    //                 const response = await mutate({
    //                   variables: this.state
    //                 });
    //                 console.log(response);
    //                 this.props.history.push('/login');
    //               }}> Reset
    //             </Button>
    //           </div>
    //         )}
    //       </Mutation>
    //     </div>
    //   </Container>

    // );
    return (
      <div>
        <div className="component-container">
          <div className="login-form">
            <Typography variant="h2">Forgot Password</Typography>
            <p>Forgot your password? Fill inthe details below to reset your password.</p>
            <Mutation<resetMutation, resetMutationVariables> mutation={ResetMutation}>
              {mutate => (
                <>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="New Password"
                    name="password"
                    autoComplete="password"
                    autoFocus
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <div className="login-footer">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="login-button"
                      onClick={async () => {
                        const response = await mutate({
                          variables: this.state
                        });
                        console.log(response);
                        this.props.history.push('/login');
                      }}
                    >
                        Reset
                    </Button>
                  </div>
                </>
              )}
            </Mutation>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
