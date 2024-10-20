import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Container, Button, CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles"; // Для темы
import { lightTheme, darkTheme } from "./themes"; // Импорт тем
import MovieAPI from "./api/service";
import MovieTable from "./components/Table";
import MovieCards from "./components/MovieCards";
import Form from "./components/Form";
import Login from "./components/Login";

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
        <Container className="App" maxWidth="md">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            {/* Кнопка переключения темы */}
            <Button onClick={toggleTheme} variant="contained" color="primary">
              Переключить на {isDarkMode ? "дневную" : "ночную"} тему
            </Button>
          </Box>

          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
            <Route
              path="/movies"
              element={
                user ? (
                  <>
                    <Form handleSubmit={addMovie} inMovie={{ title: "", genre: "" }} />
                    <MovieTable movies={movies} delMovie={delMovie} toggleTheme={toggleTheme} />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/movie-cards"
              element={
                user ? (
                  <MovieCards movies={movies} delMovie={delMovie} toggleTheme={toggleTheme} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
