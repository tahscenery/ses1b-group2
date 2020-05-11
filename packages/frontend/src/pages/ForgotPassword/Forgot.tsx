import React, { Component } from 'react';
import {
  Button,
  Container,
  FormControlLabel,
  Checkbox,
  CssBaseline,
  TextField,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';


import './Forgot.css';

class Forgot extends Component {
  render() {
    return (
      <Container component="main" maxWidth="xs">

        <CssBaseline />
        <div className="paper">
          <form className="form" noValidate>
            <Typography component="h1" variant="h2" color="primary">
              Forgot Password
              </Typography>
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
            //inputRef=""
            />

            <Typography component="h1" variant="subtitle1" color="initial">
              A password reset email will be sent to this email address
              </Typography>


            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="button"
            >Sent
          </Button>

          </form>
        </div>

      </Container>

    );
  }
}

export default Forgot;