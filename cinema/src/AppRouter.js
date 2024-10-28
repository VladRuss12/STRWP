import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MovieTable from "./pages/components/Movies/MovieTable";
import MovieCards from "./pages/components/Movies/MovieCards";
import Form from "./pages/components/Movies/Form";
import Login from "./pages/components/Login/Login";
import { deleteMovie, addMovie } from "./redux/movies/moviesSlice";
import { login as loginAction } from "./redux/auth/authSlice"; 

const AppRouter = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies); 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 

  const handleDeleteMovie = (id) => {
    dispatch(deleteMovie(id)); 
  };

  const handleLogin = (user) => {
    dispatch(loginAction(user)); 
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLogin={handleLogin} />}
      />
      <Route
        path="/movies"
        element={
          isAuthenticated ? (
            <>
              <Form handleSubmit={(movie) => dispatch(addMovie(movie))} inMovie={{ title: "", genre: "" }} />
              <MovieTable delMovie={handleDeleteMovie} />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/movie-cards"
        element={
          isAuthenticated ? (
            <>
            <Form handleSubmit={(movie) => dispatch(addMovie(movie))} inMovie={{ title: "", genre: "" }} />
            <MovieCards delMovie={handleDeleteMovie} />
            </>
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
