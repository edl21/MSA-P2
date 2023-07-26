import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const LoginForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [open, setOpen] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Email validation
    const re = /\S+@\S+\.\S+/;
    if (!re.test(values.email)) {
      alert('Please enter a valid email');
      return;
    }

    // You would need to verify the credentials here
    // For the purpose of this example, we'll just assume the login was successful

    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      navigate('/');
    }, 2000);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="email"
        label="Email"
        variant="standard"
        value={values.email}
        onChange={handleChange('email')}
      />
      <TextField
        id="password"
        label="Password"
        variant="standard"
        type="password"
        value={values.password}
        onChange={handleChange('password')}
      />
      <Button type="submit" className="sign-up-button">Login</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Logged in successfully!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default LoginForm;
