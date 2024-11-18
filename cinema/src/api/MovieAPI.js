import axios from 'axios';

const API_URL = 'http://localhost:8080/movies'; // Ваш URL для Spring-бэкенда

// Получить список фильмов
export const fetchMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Добавить фильм
export const addMovie = async (movie) => {
  const response = await axios.post(API_URL, movie);
  return response.data;
};

// Обновить фильм
export const updateMovie = async (id, movie) => {
  const response = await axios.put(`${API_URL}/${id}`, movie);
  return response.data;
};

// Удалить фильм
export const deleteMovie = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
