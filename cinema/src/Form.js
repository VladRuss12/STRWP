import React from "react";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";  // Добавлены компоненты MUI

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
      <Button variant="contained" color="primary" type="submit">
        Add
      </Button>
    </Box>
  );
};

export default Form;
