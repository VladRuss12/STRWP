import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../api/axiosConfig';
import { selectToken } from '../auth/authSlice'; // Импортируйте селектор для получения токена

const initialState = [];

// Функция для обновления заголовков axios с токеном
const setAuthHeader = (token) => {
  if (token) {
    axiosConfig.defaults.headers['Authorization'] = `Bearer ${token}`; // Устанавливаем заголовок
  } else {
    delete axiosConfig.defaults.headers['Authorization']; // Удаляем заголовок, если токен отсутствует
  }
};

// Обертка для установки заголовка перед выполнением запроса
const fetchWithAuth = async (url, method, data = null, getState) => {
  const token = selectToken(getState()); // Получаем токен из состояния
  setAuthHeader(token); // Устанавливаем заголовок с токеном
  const response = await axiosConfig({ method, url, data });
  return response.data;
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, { getState }) => {
  return await fetchWithAuth('/movies', 'GET', null, getState);
});

export const addMovie = createAsyncThunk('movies/addMovie', async (movie, { getState }) => {
  return await fetchWithAuth('/movies', 'POST', movie, getState);
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id, { getState }) => {
  await fetchWithAuth(`/movies/${id}`, 'DELETE', null, getState);
  return id;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async (movie, { getState }) => {
  // Изменяем URL на '/movies', так как id теперь будет в теле запроса
  return await fetchWithAuth('/movies', 'PUT', movie, getState);
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        return state.filter(movie => movie.id !== action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state[index] = { ...state[index], ...action.payload };
        }
      });
  },
});

export default moviesSlice.reducer;