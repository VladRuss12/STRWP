import { Routes, Route, Navigate } from "react-router-dom";
import MovieTable from "./pages/components/Movies/MovieTable";
import MovieCards from "./pages/components/Movies/MovieCards";
import Form from "./pages/components/Movies/Form";
import Login from "./pages/components/Login/Login";

const AppRouter = ({ user, movies, delMovie, addMovie, handleLogin, toggleTheme, isDarkMode }) => {
  return (
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
  );
};

export default AppRouter;
