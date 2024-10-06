
import MovieAPI from "./api/service";
import Table from "./Table";
import Form from "./Form";
import { useState } from "react";
import { Container } from "@mui/material";  // Добавлено

const initialMovies = MovieAPI.all();

function App() {
  const [movies, setMovies] = useState(initialMovies);

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

  return (
    <Container className="App" maxWidth="md"> {/* Используем Container */}
      <Form handleSubmit={addMovie} inMovie={{ title: "", genre: "" }} />
      <Table movies={movies} delMovie={delMovie} />
    </Container>
  );
}

export default App;
