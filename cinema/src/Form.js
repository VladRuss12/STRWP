import React from "react";
import { useState } from "react";

const Form = ({ handleSubmit, inMovie }) => {
  const [movie, setMovie] = useState(inMovie);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...movie, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(movie);
    setEmployee(inMovie);
  }; 

        return (
            <form onSubmit={this.onFormSubmit}>
                <label for="title">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title"
                    value={title} 
                    onChange={this.handleChange} />
                <label for="releaseYear">ReleaseYear</label>
                <input 
                    type="integer" 
                    name="releaseYear" 
                    id="releaseYear"
                    value={releaseYear} 
                    onChange={this.handleChange} />
                    <label for="description">Description</label>
                <input 
                    type="text" 
                    name="description" 
                    id="description"
                    value={description} 
                    onChange={this.handleChange} />
                <button type="submit">
                    Submit
                </button>
            </form>
        );
    }


export default Form;