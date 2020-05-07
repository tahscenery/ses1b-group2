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

import './Login.css';
import NavBar from 'components/NavBar';

class Login extends Component {
  render() {
    return (
      <div className="">
        <NavBar/>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <form className="form" noValidate>
              <Typography component="h1" variant="h2" color="secondary">
                Sign in
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              //inputRef=""
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="button"
              >
                Sign In
          </Button>
              <div className="marginTop">
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" color="secondary">
                      Forgot password?
              </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2" color="secondary">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </form>
          </div>

        </Container>
      </div>
    );
  }
}

export default Login;
