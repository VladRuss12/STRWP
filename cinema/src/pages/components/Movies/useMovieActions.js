// useMovieActions.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMovie } from '../../../redux/movies/moviesSlice';

export const useMovieActions = () => {
  const dispatch = useDispatch();
  const [editMovieId, setEditMovieId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleDelete = async () => {
    if (selectedMovie) {
      await dispatch(deleteMovie(selectedMovie.id));
      setOpenDeleteDialog(false); 
    }
  };

  const handleEdit = (movie) => {
    setEditMovieId(movie.id);
  };

  const handleCancelEdit = () => {
    setEditMovieId(null);
  };

  const handleOpenDeleteDialog = (movie) => {
    setSelectedMovie(movie);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return {
    editMovieId,
    openDeleteDialog,
    selectedMovie,
    handleDelete,
    handleEdit,
    handleCancelEdit,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog
  };
};
