import React from "react";
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
import { deleteMovie } from '../../../redux/movies/moviesSlice'; // Ensure this path is correct

const MovieTable = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies); 

  const handleDelete = (id) => {
    dispatch(deleteMovie(id)); 
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
              <Typography variant="h6">Remove</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell>{movie.title}</TableCell>
              <TableCell>{movie.genre}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => handleDelete(movie.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieTable;
