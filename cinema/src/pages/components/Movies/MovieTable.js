import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../../redux/movies/moviesSlice';
import { useMovieActions } from './useMovieActions'; 
import MovieEditForm from './MovieEditForm';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { useTheme } from '@mui/material/styles';

const MovieTable = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies) || [];
  const loading = useSelector((state) => state.movies.loading);
  const theme = useTheme();

 
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Release Year</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Director</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            movies.map((movie, index) => {
              const isEvenRow = index % 2 === 0;
              const rowBackgroundColor = theme.palette.mode === 'dark'
                ? (isEvenRow ? '#1f1f1f' : '#121212')
                : (isEvenRow ? theme.palette.background.paper : '#808080');

              return (
                <TableRow
                  key={movie.id}
                  sx={{
                    backgroundColor: rowBackgroundColor,
                    color: theme.palette.text.primary,
                  }}
                >
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>{movie.description}</TableCell>
                  <TableCell>{movie.releaseYear}</TableCell>
                  <TableCell>{movie.genre}</TableCell>
                  <TableCell>{movie.director?.name || 'Unknown'}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(movie)}>Edit</Button>
                    <Button onClick={() => handleOpenDeleteDialog(movie)}>Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

  
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
    </TableContainer>
  );
};

export default MovieTable;
