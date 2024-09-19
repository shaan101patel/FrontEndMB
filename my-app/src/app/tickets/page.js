"use client";

import React, { useState } from 'react';

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
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 text-black">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded p-6">
                <h2 className="text-2xl font-bold mb-4">Purchase Tickets</h2>

                {/* Movie Selection */}
                <h3 className="text-lg font-semibold mb-2">Select Movie</h3>
                <ul className="mb-4">
                    {moviesData.map(movie => (
                        <li key={movie.id}>
                            <button
                                onClick={() => handleSelectMovie(movie)}
                                className={`w-full text-left p-2 rounded ${selectedMovie?.id === movie.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                {movie.title}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Showtime Selection */}
                {selectedMovie && (
                    <>
                        <h3 className="text-lg font-semibold mb-2">Select Showtime</h3>
                        <ul className="mb-4">
                            {selectedMovie.showtimes.map((time, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handleSelectShowtime(time)}
                                        className={`w-full text-left p-2 rounded ${selectedShowtime === time ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
                        <div className="flex flex-col items-center mb-4">
                            <h3 className="text-lg font-semibold mb-2">Select Seats</h3>

                            {/* Key for Seat Colors */}
                            <div className="flex space-x-4 mb-4">
                                <div className="flex items-center">
                                    <button className="w-6 h-6 bg-gray-300 rounded mr-2"></button>
                                    <span>Available</span>
                                </div>
                                <div className="flex items-center">
                                    <button className="w-6 h-6 bg-blue-500 rounded mr-2"></button>
                                    <span>Selected</span>
                                </div>
                                <div className="flex items-center">
                                    <button className="w-6 h-6 bg-red-300 rounded mr-2"></button>
                                    <span>Taken</span>
                                </div>
                            </div>

                            {/* Seating Chart */}
                            <div className="overflow-x-auto">
                                <div className="grid grid-cols-6 gap-2 mb-4">
                                    {/* Empty Column for Row Labels */}
                                    <div></div>
                                    {seatingChart[0].map((_, colIndex) => (
                                        <div key={colIndex} className="text-center font-semibold">{colIndex + 1}</div>
                                    ))}
                                    {seatingChart.map((row, rowIndex) => (
                                        <React.Fragment key={rowIndex}>
                                            {/* Row Label */}
                                            <div className="text-center font-semibold">{String.fromCharCode(65 + rowIndex)}</div>
                                            {row.map(({ seat, isAvailable }) => (
                                                <button
                                                    key={seat}
                                                    onClick={() => isAvailable && handleSeatSelection(seat)}
                                                    className={`w-12 h-12 m-1 rounded ${isAvailable ? (selectedSeats.includes(seat) ? 'bg-blue-500 text-white' : 'bg-gray-300') : 'bg-red-300'} flex items-center justify-center`}
                                                    disabled={!isAvailable} // Disable button if seat is not available
                                                >
                                                    {seat}
                                                </button>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                {selectedSeats.map(seat => (
                                    <div key={seat} className="flex items-center mb-2">
                                        <span className="mr-2">Seat {seat}:</span>
                                        <input
                                            type="number"
                                            placeholder="Age"
                                            min="0"
                                            onChange={(e) => handleAgeChange(seat, e.target.value)}
                                            className="border rounded p-1"
                                            value={ages[seat] || ''}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Summary Button */}
                {selectedShowtime && selectedSeats.length > 0 && (
                    <button
                        onClick={() => alert('Tickets confirmed!')}
                        className={`bg-blue-500 text-white py-2 rounded hover:bg-blue-600 w-full ${allAgesEntered ? '' : 'opacity-50 cursor-not-allowed'}`}
                        disabled={!allAgesEntered}
                    >
                        Confirm Tickets
                    </button>
                )}
            </div>
        </div>
    );
}










