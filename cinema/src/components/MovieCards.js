import React from "react";
import { Card, CardContent, CardActions, Button, Typography, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MovieCards = ({ movies, delMovie, toggleTheme }) => {
  return (
    <>
      <Box mb={2}>
        {/* Кнопка для перехода на страницу с таблицей */}
        <Button
          component={Link}
          to="/movies"
          variant="contained"
          sx={{ backgroundColor: "#ff9900", "&:hover": { backgroundColor: "#ff7a00" } }}
        >
          Перейти на таблицу
        </Button>
      </Box>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card sx={{ backgroundColor: '#1b1b1b', color: '#fff' }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ color: '#ff9900' }}>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ color: '#ccc' }}>
                  Genre: {movie.genre}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="error"
                  onClick={() => delMovie(movie.id)}
                  sx={{
                    backgroundColor: '#ff4c4c',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#ff3333',
                    },
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MovieCards;
