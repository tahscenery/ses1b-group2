import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Link, TextField, Typography } from '@material-ui/core';
import gql from 'graphql-tag';

import './SignUp.css';
import AuthContext from 'context/authContext';
import Alert from 'components/Alert';

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  Register: boolean;
}

const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    Register(name: $name, email: $email, password: $password)
  }
`;

interface FormErrors {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

const SignUp = () => {
  useEffect(() => {
    document.title = 'Sign Up – Sapori Unici';
  }, []);

  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [registerUser, { error: registerError, data }] =
    useMutation<RegisterResponse, RegisterParams>(REGISTER_USER, {
      variables: { name, email, password }
    });

  const handleChange = (newValue: string, setter: (_: string) => void) => {
    setter(newValue);
    setErrors({ name: false, email: false, password: false, confirmPassword: false });
  }

  const checkInput = () => {
    if (name.length < 2) {
      setErrors({ ...errors, name: true });
      throw new Error("Name must have at least two characters");
    }

    if (!email.toUpperCase().match(/^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/g)) {
      setErrors({ ...errors, email: true });
      throw new Error("The provided email address doesn't appear to be a valid");
    }

    if (password.length < 8) {
      setErrors({ ...errors, password: true });
      throw new Error('Password must contain at least 8 characters');
    }

    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: true });
      throw new Error('Passwords do not match');
    }
  }

  const handleRegisterUser = () => {
    checkInput();

    setErrors({ name: false, email: false, password: false, confirmPassword: false });
    console.log('Registering user...');
    registerUser()
      .then(res => {
        console.log(`DATA: ${JSON.stringify(res.data)}`);
        console.log('Logging in...');
        history.push('/login');
      })
      .catch(error => console.error(error));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      handleRegisterUser();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="component-container">
      <div className="sign-up-form">
        <Typography variant="h2">Sign Up</Typography>
        <p>Don't have an account? Fill in the details below to get started.</p>
        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
        {registerError ? (
          registerError.graphQLErrors.map((error, index) => (
            <Alert key={`alert-${index}`} severity="error">{error.message}</Alert>
          ))
        ) : null}
        {data && data.Register ? <Alert severity="success">Success!</Alert> : null}
        <form noValidate onSubmit={e => handleSubmit(e)}>
          <TextField
            variant="outlined"
            id="name"
            label="Name"
            autoComplete="name"
            margin="normal"
            fullWidth
            required
            autoFocus
            focused={errors.name}
            error={errors.name}
            onChange={e => handleChange(e.target.value, setName)}
          />
          <TextField
            variant="outlined"
            id="email"
            label="Email"
            autoComplete="email"
            margin="normal"
            fullWidth
            required
            focused={errors.email}
            error={errors.email}
            onChange={e => handleChange(e.target.value, setEmail)}
          />
          <TextField
            variant="outlined"
            id="password"
            label="Password"
            type="password"
            margin="normal"
            fullWidth
            required
            focused={errors.password}
            error={errors.password}
            onChange={e => handleChange(e.target.value, setPassword)}
          />
          <TextField
            variant="outlined"
            id="confirm-password"
            label="Confirm Password"
            type="password"
            margin="normal"
            fullWidth
            required
            focused={errors.confirmPassword}
            error={errors.confirmPassword}
            onChange={e => handleChange(e.target.value, setConfirmPassword)}
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
  );
}

export default SignUp;
