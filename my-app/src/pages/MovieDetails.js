// src/MovieDetails.js
import React from 'react';

const MovieDetails = ({ movie, goBack }) => {
    if (!movie) {
        return <p>No movie selected.</p>;
    }

    return (
        <div className="movie-details-container">
            <button className="back-button" onClick={goBack}>Go Back</button>

            <div className="movie-info">
                <h1>{movie.title}</h1>
                <img src={movie.poster} alt={movie.title} className="movie-poster" />
                <p>{movie.description}</p>
                <h3>Showtimes:</h3>
                <ul>
                    {movie.showtimes.map((time, index) => (
                        <li key={index}>{time}</li>
                    ))}
                </ul>

                <button className="book-button">Book Tickets</button>
            </div>
        </div>
    );
};

export default MovieDetails;
