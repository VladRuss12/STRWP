import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, CardActions, Button, Typography, Grid, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, updateMovie, fetchMovies } from '../../../redux/movies/moviesSlice';
import { selectAllMovies } from '../../../redux/movies/movieSelector';

const MovieCards = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectAllMovies);
  const [editMovieId, setEditMovieId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedReleaseYear, setEditedReleaseYear] = useState('');
  const [editedGenre, setEditedGenre] = useState('');
  const [editedDirectorId, setEditedDirectorId] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteMovie(id));
  };

  const handleEditClick = (movie) => {
    setEditMovieId(movie.id);
    setEditedTitle(movie.title);
    setEditedDescription(movie.description || '');
    setEditedReleaseYear(movie.releaseYear || '');
    setEditedGenre(movie.genre);
    setEditedDirectorId(movie.directorId || '');
    setOpenEditDialog(true);
  };

  const handleUpdateMovie = async () => {
    await dispatch(updateMovie({
      id: editMovieId,
      title: editedTitle,
      description: editedDescription,
      releaseYear: editedReleaseYear,
      genre: editedGenre,
      directorId: editedDirectorId,
    }));
    setOpenEditDialog(false);
    setEditMovieId(null);
    setEditedTitle('');
    setEditedDescription('');
    setEditedReleaseYear('');
    setEditedGenre('');
    setEditedDirectorId('');
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditMovieId(null);
    setEditedTitle('');
    setEditedDescription('');
    setEditedReleaseYear('');
    setEditedGenre('');
    setEditedDirectorId('');
  };

  return (
    <div>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{movie.title}</Typography>
                <Typography variant="body2">Genre: {movie.genre}</Typography>
                <Typography variant="body2">Release Year: {movie.releaseYear}</Typography>
                <Typography variant="body2">Description: {movie.description}</Typography>
                <Typography variant="body2">Rating: {movie.rating ?? 'Not Rated'}</Typography>
                <Typography variant="body2">Comments: {movie.comments?.length || 0} comments</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleEditClick(movie)}>Edit</Button>
                <Button onClick={() => handleDelete(movie.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <TextField
            label="Release Year"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={editedReleaseYear}
            onChange={(e) => setEditedReleaseYear(e.target.value)}
          />
          <TextField
            label="Genre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedGenre}
            onChange={(e) => setEditedGenre(e.target.value)}
          />
          <TextField
            label="Director ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedDirectorId}
            onChange={(e) => setEditedDirectorId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateMovie} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieCards;
