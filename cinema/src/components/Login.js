import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';

// Стилизация основного контейнера для формы
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1b1b1b', // Фон формы
  padding: theme.spacing(3), // Отступы
  borderRadius: '8px', // Скругленные углы
  maxWidth: '400px', // Максимальная ширина
  margin: 'auto', // Центрирование
}));

const Login = ({ onLogin }) => {
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
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Users:', users); // Выводим users для отладки

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
                backgroundColor: '#141414', // Фон поля ввода
                color: '#fff', // Цвет текста
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
                backgroundColor: '#141414', // Фон поля ввода
                color: '#fff', // Цвет текста
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
            backgroundColor: '#ff9900', // Цвет кнопки
            '&:hover': {
              backgroundColor: '#ff7a00', // Цвет кнопки при наведении
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
