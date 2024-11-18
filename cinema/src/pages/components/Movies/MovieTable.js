import React, { useState } from "react";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, updateMovie } from '../../../redux/movies/moviesSlice'; 
import { useTheme } from '@mui/material/styles';
import { selectAllMovies } from '../../../redux/movies/movieSelector'; // Импортируем селектор
import MovieEditForm from './MovieEditForm';

const MovieTable = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectAllMovies); // Используем селектор
  const [editMovieId, setEditMovieId] = useState(null);
  const theme = useTheme();

  const handleDelete = async (id) => {
    await dispatch(deleteMovie(id)); // Используем thunk для асинхронного удаления
  };

  const handleEditClick = (movie) => {
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
            <TableCell>
              <Typography variant="h6">Title</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Genre</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Rating</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Remove</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Edit</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie, index) => {
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
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{movie.rating ?? 'Not Rated'}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDelete(movie.id)}>
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEditClick(movie)}>
                    Edit
                  </Button>
                </TableCell>
                {editMovieId === movie.id && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <MovieEditForm
                        movieId={movie.id}
                        title={movie.title}
                        genre={movie.genre}
                        onCancel={handleCancelEdit}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieTable;
