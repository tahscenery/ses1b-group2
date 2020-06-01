import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Typography, } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './ForgotPassword.css';

interface ResetResponse {
  Login: {
    accessToken: string;
    userId: string;
  };
}

interface ResetParams {
  email: string;
  password: string;
}

const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!, $password: String!) {
    ResetPassword(email: $email, password: $password)
  }
`;

const ForgotPassword = () => {
  const history = useHistory();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const [resetPassword, {}] =
    useMutation<ResetResponse, ResetParams>(RESET_PASSWORD, {
      variables: { email, password }
    });

  const handleChange = (newValue: string, setter: (_: string) => void) => {
    setter(newValue);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword()
      .then(response => {
        console.log(`DATA: ${JSON.stringify(response.data)}`);
        history.push('/login');
      })
      .catch(error => console.error(error))
  }

  return (
    <div>
      <div className="component-container">
        <Typography variant="h2">Forgot Password</Typography>
        <p>Forgot your password? Fill in the details below to reset it.</p>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            id="email"
            label="Email"
            autoComplete="email"
            margin="normal"
            fullWidth
            required
            autoFocus
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
            onChange={e => handleChange(e.target.value, setPassword)}
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
      </div>
    </div>
  )
}

export default ForgotPassword;
