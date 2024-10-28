import React, { useState } from "react";
import { TextField, Button, Box, Paper } from "@mui/material";

const Form = ({ handleSubmit, inMovie }) => {
  const [movie, setMovie] = useState(inMovie);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(movie);
    setMovie(inMovie);
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
        <Button variant="contained" type="submit">
          Add Movie
        </Button>
      </Box>
    </Paper>
  );
};

export default Form; 
