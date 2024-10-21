import React from "react";
import { useState } from "react";
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
    <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#1b1b1b" }}>  {/* Paper с темным фоном */}
      <Box component="form" onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={movie.title}
          onChange={handleChange}
          fullWidth
          InputProps={{
            sx: {
              backgroundColor: "#141414", // Темный фон для полей ввода
              color: "#fff",
            },
          }}
        />
        <TextField
          label="Genre"
          variant="outlined"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          fullWidth
          InputProps={{
            sx: {
              backgroundColor: "#141414", // Темный фон для полей ввода
              color: "#fff",
            },
          }}
        />
        <Button variant="contained" color="primary" type="submit" sx={{
          backgroundColor: '#ff9900',
          '&:hover': {
            backgroundColor: '#ff7a00',
          }
        }}>
          Add Movie
        </Button>
      </Box>
    </Paper>
  );
};
export default Form;
