import React, {useState} from 'react';
import {Avatar, Button, Container, Grid, Link, makeStyles, TextField, Typography} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from 'react-router-dom';
import {registerUserRequest} from "../../store/actions/usersActions";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.registerError);

  const [user, setUser] = useState({
    email: '',
    password: '',
    displayName: '',
    image: null,
  });

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setUser(prevState => ({...prevState, [name]: value}));
  };

  const submitFormHandler = e => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(user).forEach(key => {
      formData.append(key, user[key]);
    });

    dispatch(registerUserRequest(formData));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];
    setUser(prevState => {
      return {...prevState, [name]: file};
    });
  };


  return (
    <Container component="section" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h6">
          Sign up
        </Typography>
        <Grid
          component="form"
          container
          className={classes.form}
          onSubmit={submitFormHandler}
          spacing={2}
        >
          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              label="Name"
              name="displayName"
              value={user.displayName}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('displayName'))}
              helperText={getFieldError('displayName')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
                autoComplete="off"
                label="Email"
                name="email"
                value={user.email}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              name="password"
              value={user.password}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('password'))}
              helperText={getFieldError('password')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
                type="file"
                name="image"
                onChange={fileChangeHandler}
                error={Boolean(getFieldError('image'))}
                helperText={getFieldError('image')}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign up
            </Button>
          </Grid>

          <Grid item container justifyContent="flex-end">
            <Link component={RouterLink} variant="body2" to="/login">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Register;