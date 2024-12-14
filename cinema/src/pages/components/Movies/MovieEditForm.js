import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateMovie } from '../../../redux/movies/moviesSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const MovieEditForm = ({ movieId, title, description, releaseYear, genre, directorId, onCancel, open, onClose }) => {
  const dispatch = useDispatch();
  const [editedMovie, setEditedMovie] = useState({ title, description, releaseYear, genre, directorId });
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    setEditedMovie({ title, description, releaseYear, genre, directorId });
  }, [title, description, releaseYear, genre, directorId]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    releaseYear: Yup.number().required('Release Year is required').min(1888, 'Enter a valid year').max(new Date().getFullYear(), 'Enter a valid year'),
    genre: Yup.string().required('Genre is required'),
    directorId: Yup.string().required('Director ID is required'),
  });

  const formik = useFormik({
    initialValues: editedMovie,
    validationSchema,
    enableReinitialize: true, 
    onSubmit: (values) => {
      const movieData = { id: movieId, ...values, director: { id: values.directorId } };
      dispatch(updateMovie(movieData));
      onClose();  
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Movie</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" sx={{ padding: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            fullWidth
          />
          <TextField
            label="Release Year"
            name="releaseYear"
            type="number"
            value={formik.values.releaseYear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.releaseYear && Boolean(formik.errors.releaseYear)}
            helperText={formik.touched.releaseYear && formik.errors.releaseYear}
            fullWidth
          />
          <TextField
            label="Genre"
            name="genre"
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.genre && Boolean(formik.errors.genre)}
            helperText={formik.touched.genre && formik.errors.genre}
            fullWidth
          />
          <TextField
            label="Director ID"
            name="directorId"
            value={formik.values.directorId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.directorId && Boolean(formik.errors.directorId)}
            helperText={formik.touched.directorId && formik.errors.directorId}
            fullWidth
          />

          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={formik.handleSubmit} disabled={loading || !formik.isValid}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieEditForm;
