import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles'; 

// Стилизация основного контейнера для формы
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1b1b1b', 
  padding: theme.spacing(3), 
  borderRadius: '8px', 
  maxWidth: '400px', 
  margin: 'auto', 
}));

const Login = ({ onLogin, toggleTheme, isDarkMode }) => { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Определяем статический объект пользователей
  const users = {
    aaa: '123',
    admin: 'admin',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем наличие пользователя
    if (users[username] && users[username] === password) {
      onLogin({ username }); // Передаем только имя пользователя
      navigate('/movies');
    } else {
      setError('Неправильный логин или пароль');
    }
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5" align="center" sx={{ color: '#ff9900', marginBottom: 2 }}>
        Вход
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Логин"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              sx: {
                backgroundColor: '#141414',
                color: '#fff',
                '& .MuiInputBase-input': { color: '#fff' }, 
              },
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              sx: {
                backgroundColor: '#141414',
                color: '#fff',
                '& .MuiInputBase-input': { color: '#fff' }, 
              },
            }}
          />
        </Box>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#ff9900',
            '&:hover': {
              backgroundColor: '#ff7a00',
            },
          }}
        >
          Войти
        </Button>
      </form>
    </StyledPaper>
  );
};

export default Login;