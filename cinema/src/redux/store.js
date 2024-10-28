import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice'; // Adjust the path as necessary
import moviesReducer from '../redux/movies/moviesSlice'; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
  },
});

export default store;
