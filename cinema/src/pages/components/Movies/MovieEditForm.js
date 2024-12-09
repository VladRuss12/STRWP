import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateMovie } from '../../../redux/movies/moviesSlice';

const MovieEditForm = ({ movieId, title, description, releaseYear, genre, directorId, onCancel }) => {
  const dispatch = useDispatch();
  const [editedMovie, setEditedMovie] = useState({ title, description, releaseYear, genre, directorId });
  const loading = useSelector((state) => state.movies.loading);

  useEffect(() => {
    setEditedMovie({ title, description, releaseYear, genre, directorId });
  }, [title, description, releaseYear, genre, directorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie({ ...editedMovie, [name]: value });
  };

  const handleSave = () => {
    // Создаём объект с полями, которые были изменены
    const movieData = { id: movieId };
    if (editedMovie.title !== title) movieData.title = editedMovie.title;
    if (editedMovie.description !== description) movieData.description = editedMovie.description;
    if (editedMovie.releaseYear !== releaseYear) movieData.releaseYear = editedMovie.releaseYear;
    if (editedMovie.genre !== genre) movieData.genre = editedMovie.genre;
    if (editedMovie.directorId !== directorId) movieData.director = { id: editedMovie.directorId };

    dispatch(updateMovie(movieData));
    onCancel();
  };

  return (
    <Box display="flex" flexDirection="column" sx={{ padding: 2 }}>
      <TextField label="Title" name="title" value={editedMovie.title} onChange={handleChange} fullWidth />
      <TextField label="Description" name="description" value={editedMovie.description} onChange={handleChange} fullWidth />
      <TextField label="Release Year" name="releaseYear" type="number" value={editedMovie.releaseYear} onChange={handleChange} fullWidth />
      <TextField label="Genre" name="genre" value={editedMovie.genre} onChange={handleChange} fullWidth />
      <TextField label="Director ID" name="directorId" value={editedMovie.directorId} onChange={handleChange} fullWidth />
      <Box>
        <Button variant="contained" onClick={handleSave} disabled={loading} sx={{ marginRight: 1 }}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};


export default MovieEditForm;
