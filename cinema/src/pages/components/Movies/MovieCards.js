import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, CardActions, Button, Typography, Grid, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, updateMovie, fetchMovies } from '../../../redux/movies/moviesSlice';

const MovieCards = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies) || []; // Защита от undefined
  const loading = useSelector((state) => state.movies.loading); // Состояние загрузки
  const [editMovieId, setEditMovieId] = useState(null);
  const [editedMovie, setEditedMovie] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteMovie(id));
  };

  const handleEditClick = (movie) => {
    setEditMovieId(movie.id);
    setEditedMovie(movie);
    setOpenEditDialog(true);
  };

  const handleUpdateMovie = async () => {
    await dispatch(updateMovie(editedMovie));
    setOpenEditDialog(false);
    setEditMovieId(null);
    setEditedMovie({});
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditMovieId(null);
    setEditedMovie({});
  };

  return (
    <div>
      <Grid container spacing={3}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          movies.length === 0 ? (
            <Typography>No movies available</Typography>
          ) : (
            movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">{movie.title}</Typography>
                    <Typography variant="body2">Genre: {movie.genre}</Typography>
                    <Typography variant="body2">Release Year: {movie.releaseYear}</Typography>
                    <Typography variant="body2">Description: {movie.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => handleEditClick(movie)}>Edit</Button>
                    <Button onClick={() => handleDelete(movie.id)}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )
        )}
      </Grid>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={editedMovie.title || ''}
            onChange={(e) => setEditedMovie({ ...editedMovie, title: e.target.value })}
            fullWidth
          />
          {/* Добавьте остальные поля */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleUpdateMovie}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieCards;
