import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Инициализация начального состояния
const initialState = [
  { id: uuidv4(), title: "The Shawshank Redemption", genre: "Drama", rating: 9.3, comments: [] },
  { id: uuidv4(), title: "The Godfather", genre: "Crime", rating: 9.2, comments: [] },
  { id: uuidv4(), title: "The Dark Knight", genre: "Action", rating: 9.0, comments: [] },
  { id: uuidv4(), title: "Pulp Fiction", genre: "Crime", rating: 8.9, comments: [] },
  { id: uuidv4(), title: "The Lord of the Rings: The Return of the King", genre: "Fantasy", rating: 8.9, comments: [] },
  { id: uuidv4(), title: "Forrest Gump", genre: "Drama", rating: 8.8, comments: [] },
];

// Асинхронные действия
export const addMovie = createAsyncThunk('movies/addMovie', async (movie) => {
  // Эмуляция запроса на сервер
  return { ...movie, id: uuidv4(), rating: null, comments: [] };
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  // Эмуляция удаления фильма на сервере
  return id;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async (movie) => {
  // Эмуляция обновления фильма на сервере
  return movie;
});

export const rateMovie = createAsyncThunk('movies/rateMovie', async ({ id, rating }) => {
  // Эмуляция изменения рейтинга фильма
  return { id, rating };
});

export const addComment = createAsyncThunk('movies/addComment', async ({ id, comment }) => {
  // Эмуляция добавления комментария
  return { id, comment };
});

// Создание слайса с обработкой thunk'ов
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(rateMovie.fulfilled, (state, action) => {
        const index = state.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state[index].rating = action.payload.rating;
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const index = state.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state[index].comments.push(action.payload.comment);
        }
      });
  },
});

export default moviesSlice.reducer;
