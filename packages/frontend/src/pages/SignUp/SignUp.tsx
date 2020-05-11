import React, { Component } from 'react';
import {
  Button,
  Link,
  TextField,
  Typography
} from '@material-ui/core';

import './SignUp.css';
import NavBar from 'components/NavBar';

class SignUp extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="component-container">
          <div className="sign-up-form">
            <Typography variant="h2">Sign Up</Typography>
            <p>Don't have an account? Fill in the details below to get started.</p>
            <form noValidate>
              <TextField
                variant="outlined"
                id="email"
                label="Email"
                autoComplete="email"
                margin="normal"
                fullWidth
                required
                autoFocus
              />
              <TextField
                variant="outlined"
                id="password"
                label="Password"
                type="password"
                margin="normal"
                fullWidth
                required
              />
              <TextField
                variant="outlined"
                id="confirm-password"
                label="Confirm Password"
                type="confirm-password"
                margin="normal"
                fullWidth
                required
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
              {/* <Link
                href="#"
                variant="body2"
                color="secondary"
              >
                Don't have an account? Sign Up
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
