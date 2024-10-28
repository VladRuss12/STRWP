import { combineReducers } from 'redux';
import moviesReducer from './movies/moviesSlice';
import authReducer from './auth/authSlice';

const rootReducer = combineReducers({
  movies: moviesReducer,
  auth: authReducer,
});

export default rootReducer;
