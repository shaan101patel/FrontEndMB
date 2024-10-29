// app/ManageMovie/page.js

"use client";

import React, { useState } from 'react';
import './page.css'; // Import the CSS file

export default function ManageMovies() {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({ title: '', schedule: '' });

    // Function to add a new movie to the list
    const handleAddMovie = () => {
        if (!newMovie.title || !newMovie.schedule) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedMovies = [
            ...movies,
            { id: movies.length + 1, ...newMovie },
        ];
        setMovies(updatedMovies);
        setNewMovie({ title: '', schedule: '' });
    };

    // Function to delete a movie from the list
    const handleDeleteMovie = (id) => {
        const updatedMovies = movies.filter(movie => movie.id !== id);
        setMovies(updatedMovies);
    };

    return (
        <div className="manage-movies-container">
            <h2 className="manage-movies-title">Manage Movies</h2>

            <div className="add-movie-section">
                <h3 className="section-subtitle">Add New Movie</h3>
                <input
                    type="text"
                    placeholder="Movie Title"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Schedule (e.g., 12:00 PM)"
                    value={newMovie.schedule}
                    onChange={(e) => setNewMovie({ ...newMovie, schedule: e.target.value })}
                    className="input-field"
                />
                <button
                    onClick={handleAddMovie}
                    className="add-button"
                >
                    Add Movie
                </button>
            </div>

            <ul className="movies-list">
                {movies.map((movie) => (
                    <li key={movie.id} className="movie-item">
                        <div>
                            <p className="movie-title">{movie.title}</p>
                            <p className="movie-schedule">Schedule: {movie.schedule}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteMovie(movie.id)}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
