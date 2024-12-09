import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, fetchMovies } from '../../../redux/movies/moviesSlice';
import { useTheme } from '@mui/material/styles';
import MovieEditForm from './MovieEditForm';

const MovieTable = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies) || []; // Ensure movies is always an array
  const loading = useSelector((state) => state.movies.loading); // Loading state
  const [editMovieId, setEditMovieId] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchMovies()); // Fetch movies on component mount
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteMovie(id));
  };

  const handleEdit = (movie) => {
    setEditMovieId(movie.id);
  };

  const handleCancelEdit = () => {
    setEditMovieId(null);
  };

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
                    <Button onClick={() => handleDelete(movie.id)}>Delete</Button>
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
          movie={movies.find((movie) => movie.id === editMovieId)} // Pass the entire movie object
          onCancel={handleCancelEdit}
        />
      )}
    </TableContainer>
  );
};

export default MovieTable;
