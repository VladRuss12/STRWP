import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/auth/authSlice';
import { selectError, selectLoading } from '../../../redux/auth/authSelector'; // Импортируем селекторы

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const error = useSelector(selectError); // Используем селектор для получения ошибки
  const loading = useSelector(selectLoading); // Используем селектор для получения статуса загрузки

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(credentials));
    
    if (login.fulfilled.match(result)) {
      navigate('/movies');
    } else {
      setLocalError(result.error.message || 'Ошибка авторизации');
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
        {localError && <Typography color="error" align="center">{localError}</Typography>}
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Button fullWidth type="submit" variant="contained" disabled={loading}>
          {loading ? 'Загрузка...' : 'Войти'}
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
