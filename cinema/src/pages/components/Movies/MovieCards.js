import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie } from '../../../redux/movies/moviesSlice'; // Ensure the correct import path

const MovieCards = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies); 

  const handleDelete = (id) => {
    dispatch(deleteMovie(id)); 
  };

  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} key={movie.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{movie.title}</Typography>
              <Typography variant="body2">Genre: {movie.genre}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="error"
                onClick={() => handleDelete(movie.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieCards;
