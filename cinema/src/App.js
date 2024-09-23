import "./App.css";
import EmployeeAPI from "./api/service";
import Table from "./Table";
import Form from "./Form";
import { useState } from "react";

const initialEmployees = MovieApi.all();

function App() {
  const [movies, setMovies] = useState(initialEmployees);

  const delMov = (id) => {
    if (EmployeeAPI.delete(id)) {
      setEmployees(movie.filter((movie) => movie.id !== id));
    }
  };

  const addMov = (movie) => {
    const newMovie = MovieAPI.add(movie);
    if (newMovie) {
      setMov([...movies, newMovie]);
    }
  };

  return (
    <div className="App">
      <Form handleSubmit={addMovie} inMovie={{ title: "", releaseYear: "" }} />
      <Table movies={movies} delMovie={delMov} />
    </div>
  );
}

export default App;