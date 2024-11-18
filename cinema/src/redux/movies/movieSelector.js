import { createSelector } from 'reselect';

// Селектор для получения всего состояния фильмов
export const selectMovies = (state) => state.movies;

// Мемоизированный селектор для получения всех фильмов
export const selectAllMovies = createSelector(
  [selectMovies],
  (movies) => movies
);

// Мемоизированный селектор для фильмов по жанру
export const selectMoviesByGenre = (genre) => createSelector(
  [selectMovies],
  (movies) => movies.filter(movie => movie.genre === genre)
);

// Мемоизированный селектор для фильмов с рейтингом выше указанного
export const selectMoviesAboveRating = (rating) => createSelector(
  [selectMovies],
  (movies) => movies.filter(movie => movie.rating > rating)
);

// Мемоизированный селектор для получения фильма по ID
export const selectMovieById = (id) => createSelector(
  [selectMovies],
  (movies) => movies.find(movie => movie.id === id)
);
