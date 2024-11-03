import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, updateMovie } from '../../../redux/movies/moviesSlice'; 
import MovieEditForm from './MovieEditForm';

const MovieCards = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies); 
  const [editMovieId, setEditMovieId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedGenre, setEditedGenre] = useState('');

  const handleDelete = (id) => {
    dispatch(deleteMovie(id)); 
  };

  const handleEditClick = (movie) => {
    setEditMovieId(movie.id);
    setEditedTitle(movie.title);
    setEditedGenre(movie.genre);
  };

  const handleUpdateMovie = () => {
    dispatch(updateMovie({ id: editMovieId, title: editedTitle, genre: editedGenre }));
    setEditMovieId(null); 
    setEditedTitle(''); 
    setEditedGenre('');
  };

  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} key={movie.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{movie.title}</Typography>
              <Typography variant="body2">Genre: {movie.genre}</Typography>
              <Typography variant="body2">Rating: {movie.rating ?? 'Not Rated'}</Typography>
              <Typography variant="body2">Comments: {movie.comments.length} comments</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="error" onClick={() => handleDelete(movie.id)}>
                Delete
              </Button>
              <Button size="small" color="primary" onClick={() => handleEditClick(movie)}>
                Edit
              </Button>
            </CardActions>
          </Card>
          {editMovieId === movie.id && (
            <MovieEditForm
              title={editedTitle}
              genre={editedGenre}
              onTitleChange={(e) => setEditedTitle(e.target.value)}
              onGenreChange={(e) => setEditedGenre(e.target.value)}
              onSave={handleUpdateMovie}
              onCancel={() => setEditMovieId(null)}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieCards;
