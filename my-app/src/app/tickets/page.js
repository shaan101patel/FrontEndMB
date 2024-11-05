// app/tickets/page.js

"use client";

import React, { useState, useEffect } from 'react';
import './page.css';

export default function TicketPurchase() {
    const [movies, setMovies] = useState([]); // Initialize movies as an empty array
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [ages, setAges] = useState({});

    // Fetch movies data (replace with your API endpoint)
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('/api/movies'); // Adjust the endpoint as needed
                const data = await response.json();
                setMovies(data); // Assuming the response is an array of movies
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie);
        setSelectedShowtime(''); // Reset showtime selection
        setSelectedSeats([]); // Clear selected seats
        setAges({}); // Clear age input
    };

    const handleSelectShowtime = (time) => {
        setSelectedShowtime(time);
    };

    const handleSeatSelection = (seat) => {
        setSelectedSeats((prev) => {
            if (prev.includes(seat)) {
                return prev.filter(s => s !== seat); // Deselect seat
            }
            return [...prev, seat]; // Select seat
        });
    };

    const handleAgeChange = (seat, age) => {
        setAges((prev) => ({ ...prev, [seat]: age }));
    };

    // Check if all selected seats have their ages entered
    const allAgesEntered = selectedSeats.every(seat => ages[seat] > 0);

    return (
        <div className="ticket-purchase-container">
            <div className="ticket-purchase-card">
                <h2 className="ticket-purchase-title">Purchase Tickets</h2>

                {/* Movie Selection */}
                <h3 className="section-title">Select Movie</h3>
                <ul className="movie-list">
                    {movies.map(movie => (
                        <li key={movie.id}>
                            <button
                                onClick={() => handleSelectMovie(movie)}
                                className={`movie-button ${selectedMovie?.id === movie.id ? 'selected' : ''}`}
                            >
                                {movie.title}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Showtime Selection */}
                {selectedMovie && (
                    <>
                        <h3 className="section-title">Select Showtime</h3>
                        <ul className="showtime-list">
                            {selectedMovie.showtimes.map((time, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handleSelectShowtime(time)}
                                        className={`showtime-button ${selectedShowtime === time ? 'selected' : ''}`}
                                    >
                                        {time}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {/* Seat Selection */}
                {selectedShowtime && (
                    <>
                        <div className="seat-selection-section">
                            <h3 className="section-title">Select Seats</h3>

                            {/* Key for Seat Colors */}
                            <div className="seat-key">
                                <div className="seat-key-item">
                                    <div className="seat available"></div>
                                    <span>Available</span>
                                </div>
                                <div className="seat-key-item">
                                    <div className="seat selected"></div>
                                    <span>Selected</span>
                                </div>
                                <div className="seat-key-item">
                                    <div className="seat taken"></div>
                                    <span>Taken</span>
                                </div>
                            </div>

                            {/* Seating Chart */}
                            <div className="seating-chart">
                                {/* Render your seating chart here */}
                                {/* ... */}
                            </div>

                            {/* Age Input */}
                            <div className="age-input-section">
                                {selectedSeats.map(seat => (
                                    <div key={seat} className="age-input-item">
                                        <span>Seat {seat}:</span>
                                        <input
                                            type="number"
                                            placeholder="Age"
                                            min="0"
                                            onChange={(e) => handleAgeChange(seat, e.target.value)}
                                            value={ages[seat] || ''}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Confirm Button */}
                {selectedShowtime && selectedSeats.length > 0 && (
                    <button
                        onClick={() => alert('Tickets confirmed!')}
                        className={`confirm-button ${allAgesEntered ? '' : 'disabled'}`}
                        disabled={!allAgesEntered}
                    >
                        Confirm Tickets
                    </button>
                )}
            </div>
        </div>
    );
}
