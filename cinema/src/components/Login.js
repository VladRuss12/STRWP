import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles'; // Измените импорт на правильный

// Стилизация основного контейнера для формы
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1b1b1b', // Фон формы
  padding: theme.spacing(3), // Отступы
  borderRadius: '8px', // Скругленные углы
  maxWidth: '400px', // Максимальная ширина
  margin: 'auto', // Центрирование
}));

const Login = ({ onLogin, toggleTheme, isDarkMode }) => { // Добавляем isDarkMode как пропс
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
                '& .MuiInputBase-input': { color: '#fff' }, // Цвет текста в поле
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
                '& .MuiInputBase-input': { color: '#fff' }, // Цвет текста в поле
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