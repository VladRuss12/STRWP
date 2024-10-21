// src/App.js
import { useState } from "react";
import { Container, Button, CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles"; 
import { BrowserRouter as Router } from "react-router-dom";
import { lightTheme, darkTheme } from "./themes"; 
import MovieAPI from "./api/service";
import NavBar from "./pages/components/NavBar";
import AppRouter from "./AppRouter";

const initialMovies = MovieAPI.all();

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const delMovie = (id) => {
    if (MovieAPI.delete(id)) {
      setMovies(movies.filter((movie) => movie.id !== id));
    }
  };

  const addMovie = (movie) => {
    const newMovie = MovieAPI.add(movie);
    if (newMovie) {
      setMovies([...movies, newMovie]);
    }
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Container className="App" maxWidth="md">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            {/* Кнопка переключения темы */}
            <Button onClick={toggleTheme} variant="contained" color="primary">
              Переключить на {isDarkMode ? "дневную" : "ночную"} тему
            </Button>
          </Box>
          <AppRouter
            user={user}
            movies={movies}
            delMovie={delMovie}
            addMovie={addMovie}
            handleLogin={handleLogin}
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
          />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
