/*"use client";
import React, { useState } from 'react';
import './page.css';
import { addMovie } from '../movieService';

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
        status: '',
        showDates: '',
        showTimes: '',
        genre: '' // New genre field
    });

    const handleAddMovie = async () => {
        if (Object.values(newMovie).some(field => !field)) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const formattedMovie = {
                ...newMovie,
                showDates: newMovie.showDates.split(',').map(date => new Date(date.trim())),
                showTimes: newMovie.showTimes.split(',').map(time => time.trim())
            };

            await addMovie(formattedMovie);
            const updatedMovies = [
                ...movies,
                { id: movies.length + 1, ...formattedMovie }
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
                status: '',
                showDates: '',
                showTimes: '',
                genre: '' // Reset genre field
            });
        } catch (error) {
            alert("Failed to add movie. Please try again.");
        }
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
                <input
                    type="text"
                    placeholder="Show Dates (comma-separated, e.g., 2024-11-01, 2024-11-02)"
                    value={newMovie.showDates}
                    onChange={(e) => setNewMovie({ ...newMovie, showDates: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Show Times (comma-separated, e.g., 2:00 PM, 6:00 PM)"
                    value={newMovie.showTimes}
                    onChange={(e) => setNewMovie({ ...newMovie, showTimes: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={newMovie.genre}
                    onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                    className="input-field"
                />
                <button
                    onClick={handleAddMovie}
                    className="add-button"
                >
                    Add Movie
                </button>
            </div>
        </div>
    );
}*/

"use client";
import React, { useState } from 'react';
import './page.css';
import { addMovie } from '../movieService';

export default function ManageMovies() {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({
        movieName: '',
        directorName: '',
        yearReleased: '',
        movieRating: '',
        showRoom: '',
        moviePoster: '',
        trailerUrl: '',
        movieLength: '',
        shortDescription: '',
        status: '',
        showDates: '',
        showTimes: '',
        genre: ''
    });
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handleAddMovie = async () => {
        if (Object.values(newMovie).some(field => !field)) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const formattedMovie = {
                ...newMovie,
                showDates: newMovie.showDates.split(',').map(date => new Date(date.trim())),
                showTimes: newMovie.showTimes.split(',').map(time => time.trim())
            };

            await addMovie(formattedMovie);
            setMovies([...movies, { id: movies.length + 1, ...formattedMovie }]);

            // Display confirmation message
            setConfirmationMessage('Movie added successfully!');

            // Clear the form
            setNewMovie({
                movieName: '',
                directorName: '',
                yearReleased: '',
                movieRating: '',
                showRoom: '',
                moviePoster: '',
                trailerUrl: '',
                movieLength: '',
                shortDescription: '',
                status: '',
                showDates: '',
                showTimes: '',
                genre: ''
            });

            // Clear confirmation message after a few seconds
            setTimeout(() => setConfirmationMessage(''), 3000);
        } catch (error) {
            alert("Failed to add movie. Please try again.");
        }
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
                    onChange={(e) => setNewMovie({...newMovie, movieName: e.target.value})}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Director Name"
                    value={newMovie.directorName}
                    onChange={(e) => setNewMovie({...newMovie, directorName: e.target.value})}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Year Released"
                    value={newMovie.yearReleased}
                    onChange={(e) => setNewMovie({...newMovie, yearReleased: e.target.value})}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Rating"
                    value={newMovie.movieRating}
                    onChange={(e) => setNewMovie({...newMovie, movieRating: e.target.value})}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Showroom"
                    value={newMovie.showRoom}
                    onChange={(e) => setNewMovie({...newMovie, showRoom: e.target.value})}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Poster URL"
                    value={newMovie.moviePoster}
                    onChange={(e) => setNewMovie({...newMovie, moviePoster: e.target.value})}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Trailer URL"
                    value={newMovie.trailerUrl}
                    onChange={(e) => setNewMovie({...newMovie, trailerUrl: e.target.value})}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Length"
                    value={newMovie.movieLength}
                    onChange={(e) => setNewMovie({...newMovie, movieLength: e.target.value})}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newMovie.shortDescription}
                    onChange={(e) => setNewMovie({...newMovie, shortDescription: e.target.value})}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={newMovie.status}
                    onChange={(e) => setNewMovie({...newMovie, status: e.target.value})}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Show Dates (comma separated)"
                    value={newMovie.showDates}
                    onChange={(e) => setNewMovie({...newMovie, showDates: e.target.value})}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Show Times (comma separated)"
                    value={newMovie.showTimes}
                    onChange={(e) => setNewMovie({...newMovie, showTimes: e.target.value})}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={newMovie.genre}
                    onChange={(e) => setNewMovie({...newMovie, genre: e.target.value})}
                    className="input-field"
                />
                <button onClick={handleAddMovie} className="add-button">
                    Add Movie
                </button>

                {confirmationMessage && (
                    <p className="confirmation-text">
                        {confirmationMessage}
                    </p>
                )}
            </div>
        </div>
    );
}
