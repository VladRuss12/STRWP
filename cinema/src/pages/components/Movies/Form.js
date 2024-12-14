import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addMovie } from '../../../redux/movies/moviesSlice';

const Form = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.movies.error);
  const loading = useSelector((state) => state.movies.loading);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    releaseYear: Yup.number().required('Release Year is required').min(1888, 'Enter a valid year').max(new Date().getFullYear(), 'Enter a valid year'),
    genre: Yup.string().required('Genre is required'),
    directorId: Yup.string().required('Director ID is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      releaseYear: '',
      genre: '',
      directorId: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const movieData = { ...values, director: { id: values.directorId } };
      dispatch(addMovie(movieData));
      setDialogMessage('Movie added successfully!');
      setDialogOpen(true);
      resetForm();
    },
  });

  return (
    <>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
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
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Movie'}
          </Button>
        </Box>
      </Paper>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Form;
