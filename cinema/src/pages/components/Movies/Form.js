import React, { useState } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addMovie } from "../../../redux/movies/moviesSlice"; 

const Form = ({ inMovie }) => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(inMovie);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    
 
    if (!movie.title || !movie.genre) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

   
    dispatch(addMovie(movie));
    setMovie(inMovie); 
    setError(''); 
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Box component="form" onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={movie.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Genre"
          variant="outlined"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          fullWidth
        />
        {error && <Typography color="error">{error}</Typography>} {/* Отображение ошибки */}
        <Button variant="contained" type="submit">
          Add Movie
        </Button>
      </Box>
    </Paper>
  );
};

export default Form;
