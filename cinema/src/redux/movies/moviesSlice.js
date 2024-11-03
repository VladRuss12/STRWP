import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [
  { id: uuidv4(), title: "The Shawshank Redemption", genre: "Drama", rating: 9.3, comments: [] },
  { id: uuidv4(), title: "The Godfather", genre: "Crime", rating: 9.2, comments: [] },
  { id: uuidv4(), title: "The Dark Knight", genre: "Action", rating: 9.0, comments: [] },
  { id: uuidv4(), title: "Pulp Fiction", genre: "Crime", rating: 8.9, comments: [] },
  { id: uuidv4(), title: "The Lord of the Rings: The Return of the King", genre: "Fantasy", rating: 8.9, comments: [] },
  { id: uuidv4(), title: "Forrest Gump", genre: "Drama", rating: 8.8, comments: [] },
];


const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.push({ ...action.payload, id: uuidv4(), rating: null, comments: [] }); 
    },
    deleteMovie: (state, action) => {
      return state.filter(movie => movie.id !== action.payload);
    },
    updateMovie: (state, action) => {
      const index = state.findIndex(movie => movie.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    rateMovie: (state, action) => {
      const { id, rating } = action.payload;
      const index = state.findIndex(movie => movie.id === id);
      if (index !== -1) {
        state[index].rating = rating; 
      }
    },
    addComment: (state, action) => {
      const { id, comment } = action.payload;
      const index = state.findIndex(movie => movie.id === id);
      if (index !== -1) {
        state[index].comments.push(comment);
      }
    },
    removeComment: (state, action) => {
      const { id, commentIndex } = action.payload;
      const index = state.findIndex(movie => movie.id === id);
      if (index !== -1) {
        state[index].comments.splice(commentIndex, 1); 
      }
    },
    filterMovies: (state, action) => {
      const filter = action.payload.toLowerCase();
      return state.filter(movie => 
        movie.title.toLowerCase().includes(filter) || 
        movie.genre.toLowerCase().includes(filter)
      );
    },
  },
});

export const { addMovie, deleteMovie, updateMovie, rateMovie, addComment, removeComment, filterMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
