import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { id: 1, title: "Ben Blocker", genre: "Teacher" },
    { id: 2, title: "Dave Defender", genre: "Student" },
    { id: 3, title: "Sam Sweeper", genre: "Teacher" },
    { id: 4, title: "Matt Midfielder", genre: "Student" },
    { id: 5, title: "William Winger", genre: "Student" },
    { id: 6, title: "Fillipe Forward", genre: "Rector" },
];

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.push(action.payload);
    },
    deleteMovie: (state, action) => {
      return state.filter(movie => movie.id !== action.payload);
    },
    updateMovie: (state, action) => {
      const index = state.findIndex(movie => movie.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addMovie, deleteMovie, updateMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
