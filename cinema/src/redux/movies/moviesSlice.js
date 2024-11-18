import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../api/axiosConfig';

const initialState = [];

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axiosConfig.get('/movies');
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async (movie) => {
  const response = await axiosConfig.post('/movies', movie);
  return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  await axiosConfig.delete(`/movies/${id}`);
  return id;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async (movie) => {
  const response = await axiosConfig.put(`/movies/${movie.id}`, movie);
  return response.data;
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
