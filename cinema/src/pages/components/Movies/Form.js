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

  const onSubmit = async (event) => {
    event.preventDefault();
    
    if (!movie.title || !movie.genre) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      await dispatch(addMovie(movie)); // Используем thunk для асинхронного добавления
      setMovie(inMovie); // Очистить форму после успешного добавления
      setError('');
    } catch (error) {
      setError('Ошибка при добавлении фильма.');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Box component="form" onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Название"
          variant="outlined"
          name="title"
          value={movie.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Жанр"
          variant="outlined"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          fullWidth
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" type="submit">
          Добавить фильм
        </Button>
      </Box>
    </Paper>
  );
};

export default Form;
