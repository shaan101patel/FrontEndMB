"use client";

import React, { useState } from 'react';
import './page.css'; // Import the CSS file
import { addMovie } from '../movieService'; // Import the addMovie function from movieService

export default function ManageMovies() {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({
        movieName: '',
        directorName: '',
        yearReleased: '',
        movieRating: '',
        moviePoster: '',
        trailerUrl: '',
        movieLength: '',
        shortDescription: '',
        status: ''
    });

    // Function to add a new movie to the list and the backend
    const handleAddMovie = async () => {
        // Check if all fields are filled in
        if (Object.values(newMovie).some(field => !field)) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Add movie to backend
            await addMovie(newMovie);

            // Update the local state if the movie is successfully added in backend
            const updatedMovies = [
                ...movies,
                { id: movies.length + 1, ...newMovie },
            ];
            setMovies(updatedMovies);
            setNewMovie({
                movieName: '',
                directorName: '',
                yearReleased: '',
                movieRating: '',
                moviePoster: '',
                trailerUrl: '',
                movieLength: '',
                shortDescription: '',
                status: ''
            });
        } catch (error) {
            alert("Failed to add movie. Please try again.");
        }
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
                    placeholder="Movie Name"
                    value={newMovie.movieName}
                    onChange={(e) => setNewMovie({ ...newMovie, movieName: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Director Name"
                    value={newMovie.directorName}
                    onChange={(e) => setNewMovie({ ...newMovie, directorName: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Year Released"
                    value={newMovie.yearReleased}
                    onChange={(e) => setNewMovie({ ...newMovie, yearReleased: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Movie Rating"
                    value={newMovie.movieRating}
                    onChange={(e) => setNewMovie({ ...newMovie, movieRating: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Movie Poster URL"
                    value={newMovie.moviePoster}
                    onChange={(e) => setNewMovie({ ...newMovie, moviePoster: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Trailer URL"
                    value={newMovie.trailerUrl}
                    onChange={(e) => setNewMovie({ ...newMovie, trailerUrl: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Movie Length (e.g., 120 mins)"
                    value={newMovie.movieLength}
                    onChange={(e) => setNewMovie({ ...newMovie, movieLength: e.target.value })}
                    className="input-field"
                />
                <textarea
                    placeholder="Short Description"
                    value={newMovie.shortDescription}
                    onChange={(e) => setNewMovie({ ...newMovie, shortDescription: e.target.value })}
                    className="input-field"
                ></textarea>
                <input
                    type="text"
                    placeholder="Status (e.g., Now Showing)"
                    value={newMovie.status}
                    onChange={(e) => setNewMovie({ ...newMovie, status: e.target.value })}
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
                            <p className="movie-title">{movie.movieName}</p>
                            <p className="movie-details">
                                Director: {movie.directorName} | Released: {movie.yearReleased} | Rating: {movie.movieRating}
                            </p>
                            <p className="movie-schedule">Status: {movie.status}</p>
                            <p className="movie-description">{movie.shortDescription}</p>
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


