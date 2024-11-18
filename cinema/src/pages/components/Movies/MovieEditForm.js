import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateMovie } from '../../../redux/movies/moviesSlice'; 

const MovieEditForm = ({ movieId, title, genre, onCancel }) => {
  const dispatch = useDispatch();
  
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedGenre, setEditedGenre] = useState(genre);

  useEffect(() => {
    setEditedTitle(title);
    setEditedGenre(genre);
  }, [title, genre]);

  const handleSave = () => {
    dispatch(updateMovie({ id: movieId, title: editedTitle, genre: editedGenre }));
    onCancel();
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
        label="Genre"
        value={editedGenre}
        onChange={(e) => setEditedGenre(e.target.value)}
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
