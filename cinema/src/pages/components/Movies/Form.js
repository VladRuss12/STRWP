import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../../redux/movies/moviesSlice';

const Form = () => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    releaseYear: '',
    genre: '',
    directorId: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Проверка на заполненность всех полей
    if (!movie.title || !movie.description || !movie.releaseYear || !movie.genre || !movie.directorId) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Создание объекта с вложенным director
      const movieData = {
        title: movie.title,
        description: movie.description,
        releaseYear: movie.releaseYear,
        genre: movie.genre,
        director: {
          id: movie.directorId // Изменение здесь
        }
      };

      // Диспатчим экшен для добавления фильма
      await dispatch(addMovie(movieData)).unwrap();
      // Сбрасываем форму после успешного добавления
      setMovie({ title: '', description: '', releaseYear: '', genre: '', directorId: '' });
      setError('');
    } catch (error) {
      // Обработка ошибок
      setError('Error adding movie. Please try again.');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={movie.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={movie.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Release Year"
          variant="outlined"
          name="releaseYear"
          type="number"
          value={movie.releaseYear}
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
        <TextField
          label="Director ID"
          variant="outlined"
          name="directorId"
          value={movie.directorId}
          onChange={handleChange}
          fullWidth
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" type="submit">
          Add Movie
        </Button>
      </Box>
    </Paper>
  );
};

export default Form;