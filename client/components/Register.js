import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import HouseIcon from '@material-ui/icons/House';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import GoogleIcon from './GoogleIcon';
import api from '../axios/axios';
import MD5 from 'crypto-js/md5';
import { useHistory, Redirect } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {' by '}
      <Link color="inherit" href="https://github.com/kenchlo2/rently#readme">
        kenchlo2
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(5)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  googleBtn: {
    margin: theme.spacing(0, 0, 0)
  },
}));

const errStyles = {
  display: 'inline',
  color: 'red'
};

export default function SignIn({ isLoggedIn, setIsLoggedIn }) {
  const classes = useStyles();

  //state to store input field values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validatePassword, setValidatePassword] = useState('');

  //submit fxn to make http call to BE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length < 3) {
      return document.getElementById('register-err').innerText = 'Username must be at least 3 characters long!'
    } else if (password.length < 8 || ! password.match(/[a-zA-Z]+/) || ! password.match(/[0-9]+/) ) {
      return document.getElementById('register-err').innerText = 'Password must contain at least 8 characters, and a mixture of letters AND numbers!'
    } else if (password !== validatePassword) {
      return document.getElementById('register-err').innerText = 'Entered passwords do not match!'
    } else {
      api({
        method: 'post',
        url: '/register',
        data: {
          username,
          password: MD5(password).toString()
        },
      }).then((res) => {
        setIsLoggedIn(res.data.success);
      }).catch(err => {
        document.getElementById('register-err').innerText = 'Account creation fails. Please choose another username.'
      });
    }
  };

  if (isLoggedIn) return <Redirect to="/" />;

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={3}>
        <Card classsName={classes.card}>
          <Box p={3}>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <HouseIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="validatePassword"
                  label="Re-Enter Password"
                  type="password"
                  id="validatePassword"
                  value={validatePassword}
                  onChange={(e) => {
                    setValidatePassword(e.target.value);
                  }}
                />
                <div id="register-err" style={errStyles}>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Register
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="signin" variant="body2">
                      Already Have An Account? Sign In
                    </Link>
                  </Grid>
                </Grid>
              </form>

              <Typography
                component="h3"
                variant="h5"
                className={classes.submit}
              >
                <Divider />
              </Typography>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}
