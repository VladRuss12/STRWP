import { createSelector } from 'reselect';


export const selectMovies = (state) => state.movies;


export const selectAllMovies = createSelector(
  [selectMovies],
  (movies) => movies
);


export const selectMoviesByGenre = (genre) => createSelector(
  [selectMovies],
  (movies) => movies.filter(movie => movie.genre === genre)
);


export const selectMoviesAboveRating = (rating) => createSelector(
  [selectMovies],
  (movies) => movies.filter(movie => movie.rating > rating)
);


export const selectMovieById = (id) => createSelector(
  [selectMovies],
  (movies) => movies.find(movie => movie.id === id)
);
