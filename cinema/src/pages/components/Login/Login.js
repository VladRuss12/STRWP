import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../../../redux/auth/authSlice';
import { selectError, selectLoading } from '../../../redux/auth/authSelector';
import axiosConfig from '../../../api/axiosConfig'; 

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting to log in with:", credentials); 

    try {
 
      const response = await axiosConfig.post('/auth/sign-in', credentials);

      console.log("Login response:", response); 

   
      localStorage.setItem('jwt_token', response.data.token);


      axiosConfig.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

     
      dispatch(loginSuccess(response.data));

  
      navigate('/movies');
    } catch (err) {
      console.error("Login error:", err); 
    
      const errorMessage = err.response?.data?.message || err.message || 'Ошибка авторизации';
      setLocalError(errorMessage);
      dispatch(loginFailure(errorMessage));

      console.log("Error message:", errorMessage); 
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
