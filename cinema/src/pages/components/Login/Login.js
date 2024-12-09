import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/auth/authSlice';
import { selectAuthError, selectAuthLoading } from '../../../redux/auth/authSelector'; // Исправленные импорты

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login(credentials));
    if (login.fulfilled.match(resultAction)) {
      navigate('/movies');
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
            label="Имя пользователя"
            variant="outlined"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
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
            required
          />
        </Box>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Загрузка...' : 'Войти'}
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
