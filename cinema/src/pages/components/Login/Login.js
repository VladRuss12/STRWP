import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/auth/authSlice';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const users = {
    aaa: '123',
    admin: 'admin',
    user1: 'user1',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (users[username] === password) {
      dispatch(login({ username })); // Dispatch the login action
      navigate('/movies');
    } else {
      setError('Неправильный логин или пароль');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Вход
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Логин"
            variant="outlined"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            variant="outlined"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </Box>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Button fullWidth type="submit" variant="contained">
          Войти
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
