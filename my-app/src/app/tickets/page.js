// app/tickets/page.js

"use client";

import React, { useState } from 'react';
import './page.css';

// Sample data for movies and showtimes
const moviesData = [
    { id: 1, title: 'Barbie', showtimes: ['12:00 PM', '3:00 PM', '6:00 PM'] },
    { id: 2, title: 'Oppenheimer', showtimes: ['1:00 PM', '4:00 PM', '7:00 PM'] },
];

// Seating chart layout: 5 rows with 5 seats per row
const seatingChart = Array.from({ length: 5 }, (_, rowIndex) =>
    Array.from({ length: 5 }, (_, seatIndex) => ({
        seat: `${String.fromCharCode(65 + rowIndex)}-${seatIndex + 1}`,
        isAvailable: true, // Assume all seats are available initially
    }))
);

export default function TicketPurchase() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [ages, setAges] = useState({});

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
                    {moviesData.map(movie => (
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
                                <div className="chart-grid">
                                    {/* Empty Column for Row Labels */}
                                    <div></div>
                                    {seatingChart[0].map((_, colIndex) => (
                                        <div key={colIndex} className="seat-label">{colIndex + 1}</div>
                                    ))}
                                    {seatingChart.map((row, rowIndex) => (
                                        <React.Fragment key={rowIndex}>
                                            {/* Row Label */}
                                            <div className="seat-label">{String.fromCharCode(65 + rowIndex)}</div>
                                            {row.map(({ seat, isAvailable }) => (
                                                <button
                                                    key={seat}
                                                    onClick={() => isAvailable && handleSeatSelection(seat)}
                                                    className={`seat ${isAvailable ? (selectedSeats.includes(seat) ? 'selected' : 'available') : 'taken'}`}
                                                    disabled={!isAvailable}
                                                >
                                                    {seat}
                                                </button>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
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









