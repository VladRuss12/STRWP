import React from "react";
import { useState } from "react";

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
    <form onSubmit={onSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={movie.title}
        onChange={handleChange}
      />
      <label htmlFor="genre">Genre</label>
      <input
        type="text"
        name="genre"
        value={movie.genre}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;