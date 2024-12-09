import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../api/axiosConfig';
import { selectToken } from '../auth/authSlice'; // Импорт селектора для токена

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

// Установка токена в заголовки запросов
const setAuthHeader = (token) => {
  if (token) {
    axiosConfig.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosConfig.defaults.headers['Authorization'];
  }
};

// Асинхронные действия
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = selectToken(getState()); // Получаем токен из состояния
      setAuthHeader(token); // Устанавливаем заголовок авторизации
      const response = await axiosConfig.get('/movies');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching movies.');
    }
  }
);

export const addMovie = createAsyncThunk(
  'movies/addMovie',
  async (movie, { getState, rejectWithValue }) => {
    try {
      const token = selectToken(getState()); // Получаем токен из состояния
      setAuthHeader(token); // Устанавливаем заголовок авторизации
      const response = await axiosConfig.post('/movies', movie);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error adding movie.');
    }
  }
);

export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async (movie, { getState, rejectWithValue }) => {
    try {
      const token = selectToken(getState()); // Получаем токен из состояния
      setAuthHeader(token); // Устанавливаем заголовок авторизации
      // Отправляем фильм без movieId в URL
      const response = await axiosConfig.put(`/movies`, movie); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error updating movie.');
    }
  }
);

export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = selectToken(getState()); // Получаем токен из состояния
      setAuthHeader(token); // Устанавливаем заголовок авторизации
      await axiosConfig.delete(`/movies/${id}`);
      return id; // Возвращаем ID удалённого фильма
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error deleting movie.');
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) {
          state.movies[index] = { ...state.movies[index], ...action.payload };
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((movie) => movie.id !== action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
