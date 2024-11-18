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
  Typography,
  CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, fetchMovies, updateMovie } from '../../../redux/movies/moviesSlice'; 
import { useTheme } from '@mui/material/styles';
import MovieEditForm from './MovieEditForm';

const MovieTable = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [editMovieId, setEditMovieId] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchMovies()).finally(() => setLoading(false)); 
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
            movies.map((movie) => (
              <TableRow key={movie.id}>
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
            ))
          )}
        </TableBody>
      </Table>
      {editMovieId && (
        <MovieEditForm
          movieId={editMovieId}
          title={movies.find((movie) => movie.id === editMovieId).title}
          description={movies.find((movie) => movie.id === editMovieId).description}
          releaseYear={movies.find((movie) => movie.id === editMovieId).releaseYear}
          genre={movies.find((movie) => movie.id === editMovieId).genre}
          directorId={movies.find((movie) => movie.id === editMovieId).directorId}
          onCancel={handleCancelEdit}
        />
      )}
    </TableContainer>
  );
};

export default MovieTable;
