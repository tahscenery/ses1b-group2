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

class Login extends Component {
  componentDidMount() {
    document.title = 'Login – Sapori Unici';
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="component-container">
          <div className="back">
          <div className="login-form">
            <Typography variant="h2">Login</Typography>
            <p>Sign in with your email and password below.</p>
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
                autoComplete="current-password"
                margin="normal"
                fullWidth
                required
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
}

export default Login;
