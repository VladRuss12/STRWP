
import React, { useEffect } from 'react';
import { Grid, Card, CardContent, CardActions, Button, Typography, Dialog } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../../redux/movies/moviesSlice';
import { useMovieActions } from './useMovieActions'; 
import MovieEditForm from './MovieEditForm'; 
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

const MovieCards = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies) || [];
  const loading = useSelector((state) => state.movies.loading);

  
  const {
    editMovieId,
    openDeleteDialog,
    selectedMovie,
    handleDelete,
    handleEdit,
    handleCancelEdit,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog
  } = useMovieActions();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div>
      <Grid container spacing={3}>
        {loading ? (
          <Typography>Loading...</Typography>
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
                  <Button onClick={() => handleEdit(movie)}>Edit</Button>
                  <Button onClick={() => handleOpenDeleteDialog(movie)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

       {editMovieId && (
        <MovieEditForm
          movieId={editMovieId}
          title={movies.find((movie) => movie.id === editMovieId)?.title}
          description={movies.find((movie) => movie.id === editMovieId)?.description}
          releaseYear={movies.find((movie) => movie.id === editMovieId)?.releaseYear}
          genre={movies.find((movie) => movie.id === editMovieId)?.genre}
          directorId={movies.find((movie) => movie.id === editMovieId)?.director?.id}
          open={Boolean(editMovieId)} 
          onClose={handleCancelEdit} 
        />
      )}

      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        deleteHandler={handleDelete}
        item={selectedMovie}
      />
    </div>
  );
};

export default MovieCards;
