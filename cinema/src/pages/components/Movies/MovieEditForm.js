import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateMovie } from '../../../redux/movies/moviesSlice';

const MovieEditForm = ({ movieId, title, description, releaseYear, genre, directorId, onCancel }) => {
  const dispatch = useDispatch();

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedReleaseYear, setEditedReleaseYear] = useState(releaseYear);
  const [editedGenre, setEditedGenre] = useState(genre);
  const [editedDirectorId, setEditedDirectorId] = useState(directorId);

  useEffect(() => {
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedReleaseYear(releaseYear);
    setEditedGenre(genre);
    setEditedDirectorId(directorId);
  }, [title, description, releaseYear, genre, directorId]);

  const handleSave = async () => {
    try {
      // Update movie data with the directorId nested inside the director object
      const movieData = {
        id: movieId, // Ensure movieId remains unchanged
        title: editedTitle,
        description: editedDescription,
        releaseYear: editedReleaseYear,
        genre: editedGenre,
        director: {
          id: editedDirectorId // Director ID is now inside the director object
        }
      };
  
      // Dispatch the update action with the updated movie data
      await dispatch(updateMovie(movieData));
      onCancel(); // Cancel edit action
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" sx={{ padding: 2 }}>
      <TextField
        label="Title"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label="Description"
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label="Release Year"
        value={editedReleaseYear}
        onChange={(e) => setEditedReleaseYear(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label="Genre"
        value={editedGenre}
        onChange={(e) => setEditedGenre(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label="Director ID"
        value={editedDirectorId}
        onChange={(e) => setEditedDirectorId(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 1 }}
      />
      <Box>
        <Button variant="contained" onClick={handleSave} sx={{ marginRight: 1 }}>
          Save
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default MovieEditForm;
