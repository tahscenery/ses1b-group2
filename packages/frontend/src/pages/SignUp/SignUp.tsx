import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Link, TextField, Typography } from '@material-ui/core';
import gql from 'graphql-tag';

import './SignUp.css';
import NavBar from 'components/NavBar';

interface RegisterResponse {
  Register: boolean;
}

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    Register(name: $name, email: $email, password: $password)
  }
`;

interface LoginResponse {
  Login: { accessToken: string; };
}

interface LoginParams {
  email: string;
  password: string;
}

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
      accessToken
    }
  }
`;

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [registerUser, { error: registerError, data: registerData }] =
    useMutation<RegisterResponse, RegisterParams>(REGISTER_USER, {
      variables: { name, email, password }
    });

  const [loginUser, {}] =
    useMutation<LoginResponse, LoginParams>(LOGIN_USER, {
      variables: { email, password }
    });

  const handleRegisterUser = () => {
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Confirm Password: ${confirmPassword}`);

    if (name.length < 2) {
      throw new Error("Name must have at least two characters");
    }

    if (!email.toUpperCase().match(/^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/g)) {
      throw new Error("Email field doesn't appear to be a valid email address");
    }

    if (password.length < 8) {
      throw new Error('Password must contain at least 8 characters');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    console.log('Registering user...');
    registerUser()
      .then(() => {
        console.log('Logging user in...');
        loginUser()
          .then(result => {
            if (result.data) {
              fetch('http://localhost:4000/graphql', {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(result.data),
                redirect: 'follow',
              })
              .then(res => res.json())
              .then(data => console.log(data))
              .catch(error => `A fetch error occurred: ${error}`);
            }
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  return (
    <div>
      <NavBar/>
      <div className="component-container">
        <div className="sign-up-form">
          <Typography variant="h2">Sign Up</Typography>
          <p>Don't have an account? Fill in the details below to get started.</p>
          {registerError ? <p>(ERRROR): {registerError.message}</p> : null}
          {registerData && registerData.Register ? <p>Success!</p> : null}
          <form
            noValidate
            method="POST"
            id="sign-up-form"
            onSubmit={e => {
              e.preventDefault();
              try {
                handleRegisterUser();
              } catch (error) {
                console.log(error);
              }
            }}>
            <TextField
              variant="outlined"
              id="name"
              label="Name"
              autoComplete="name"
              margin="normal"
              fullWidth
              required
              autoFocus
              onChange={e => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              id="email"
              label="Email"
              autoComplete="email"
              margin="normal"
              fullWidth
              required
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              id="password"
              label="Password"
              type="password"
              margin="normal"
              fullWidth
              required
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              id="confirm-password"
              label="Confirm Password"
              type="password"
              margin="normal"
              fullWidth
              required
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <Button
              className="sign-up-button"
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              fullWidth
            >
              Sign Up
            </Button>
          </form>
          <div className="sign-up-footer">
            <Link
              href="/login"
              variant="body2"
              color="secondary"
            >
              I have an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
