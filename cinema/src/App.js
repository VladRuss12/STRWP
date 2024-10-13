import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MovieAPI from "./api/service";
import MovieTable from "./components/Table"; 
import Form from "./components/Form";
import { useState } from "react";
import { Container } from "@mui/material";  
import Login from "./components/Login";

const initialMovies = MovieAPI.all();

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [user, setUser] = useState(null);

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

  return (
    <Router>
      <Container className="App" maxWidth="md">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/movies"
            element={
              user ? (
                <>
                  <Form handleSubmit={addMovie} inMovie={{ title: "", genre: "" }} />
                  <MovieTable movies={movies} delMovie={delMovie} /> {}
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
