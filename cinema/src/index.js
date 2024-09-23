import React from "react";

const Table = ({ employees, delEmployee }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>ReleaseYear</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => {
          return (
            <tr key={index}>
              <td>{movie.title}</td>
              <td>{movie.releaseYear}</td>
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