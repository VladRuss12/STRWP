import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:8088',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для проверки действительности токена
const isTokenValid = (token) => {
  // Здесь можно добавить логику для проверки токена, например, декодировать его и проверить срок действия
  const payload = JSON.parse(atob(token.split('.')[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp > currentTime; // Проверяем, не истек ли срок действия токена
};

// Функция для обновления токена
const refreshToken = (oldToken) => {
  // Здесь можно реализовать логику для генерации нового токена
  // Например, если у вас есть функция для создания токена
  const newToken = oldToken; // На данный момент просто возвращаем старый токен
  // В реальном приложении вы можете использовать другой механизм для обновления токена
  return newToken;
};

axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');

    if (token) {
      if (!isTokenValid(token)) {
        // Если токен недействителен, обновляем его
        const newToken = refreshToken(token);
        localStorage.setItem('jwt_token', newToken);
        config.headers['Authorization'] = `Bearer ${newToken}`;
      } else {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Обработчик ошибок для ответов от сервера
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    // Если ошибка связана с аутентификацией (например, 401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('jwt_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;