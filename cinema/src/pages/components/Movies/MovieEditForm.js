import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const MovieEditForm = ({ title, genre, onTitleChange, onGenreChange, onSave, onCancel }) => {
  return (
    <Box display="flex" flexDirection="column" sx={{ padding: 2 }}>
      <TextField
        label="Title"
        value={title}
        onChange={onTitleChange}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label="Genre"
        value={genre}
        onChange={onGenreChange}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 1 }}
      />
      <Box>
        <Button variant="contained" onClick={onSave} sx={{ marginRight: 1 }}>
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
