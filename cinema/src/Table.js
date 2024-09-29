import React from "react";

const Table = ({ movies, delMovie }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, index) => {
          return (
            <tr key={index}>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>
                <button onClick={() => delMovie(movie.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;