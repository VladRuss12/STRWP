import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie } from '../../../redux/movies/moviesSlice';

const Form = () => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState({ title: '', description: '', releaseYear: '', genre: '', directorId: '' });
  const error = useSelector((state) => state.movies.error);
  const loading = useSelector((state) => state.movies.loading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const movieData = { ...movie, director: { id: movie.directorId } };
    dispatch(addMovie(movieData));
    setMovie({ title: '', description: '', releaseYear: '', genre: '', directorId: '' });
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Title" name="title" value={movie.title} onChange={handleChange} fullWidth />
        <TextField label="Description" name="description" value={movie.description} onChange={handleChange} fullWidth />
        <TextField label="Release Year" name="releaseYear" type="number" value={movie.releaseYear} onChange={handleChange} fullWidth />
        <TextField label="Genre" name="genre" value={movie.genre} onChange={handleChange} fullWidth />
        <TextField label="Director ID" name="directorId" value={movie.directorId} onChange={handleChange} fullWidth />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Movie'}
        </Button>
      </Box>
    </Paper>
  );
};

export default Form;
