/*"use client";

import React, { useState, useEffect } from 'react';
import { fetchMovieById } from '../../movieService'; // Adjust the path to your movieService

export default function TicketPurchase({ params }) {
    console.log("hi");


    const { id } = params; // Capture the `id` parameter from the URL
    console.log(id);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            console.log("hello");

            if (!id) return; // Don't fetch if id is not yet available

            try {
                console.log("Fetching movie with ID:", id);
                const movie = await fetchMovieById(id); // Use the movieService function
                setSelectedMovie(movie);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        fetchMovie(); // Call the fetch function
    }, [id]); // Dependency array includes id

    return (
        <div>

            {selectedMovie ? (
                <div>
                    <h1>{selectedMovie.movieName}</h1>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}*/

/*
"use client";

import React, { useState, useEffect } from 'react';
import { fetchMovieById } from '../../movieService'; // Adjust the path to your movieService

export default function TicketPurchase({ params }) {
    const { id } = params;
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        const fetchMovie = async () => {
            if (!id) return;

            try {
                const movie = await fetchMovieById(id);
                setSelectedMovie(movie);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        fetchMovie();
    }, [id]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    return (
        <div>
            {selectedMovie ? (
                <div>
                    <h1>{selectedMovie.movieName}</h1>

                    <label htmlFor="showDate">Select a Date:</label>
                    <select id="showDate" value={selectedDate} onChange={handleDateChange}>
                        <option value="">--Select Date--</option>
                        {selectedMovie.showDates.map((date, index) => (
                            <option key={index} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="showTime">Select a Time:</label>
                    <select id="showTime" value={selectedTime} onChange={handleTimeChange} disabled={!selectedDate}>
                        <option value="">--Select Time--</option>
                        {selectedMovie.showTimes.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
*/

/*"use client";

import React, { useState, useEffect } from 'react';
import { fetchMovieById } from '../../movieService';
import './page.css';
import { useRouter } from 'next/Navigation';

export default function TicketPurchase({ params }) {
    const { id } = params;
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [ageCategories, setAgeCategories] = useState({}); // To track age for each seat
    const router = useRouter(); // Initialize router


    // Example seat layout
    const seatLayout = [
        ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
        ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
        ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
        ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"],
        ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"]
    ];

    useEffect(() => {
        const fetchMovie = async () => {
            if (!id) return;

            try {
                const movie = await fetchMovieById(id);
                setSelectedMovie(movie);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        fetchMovie();
    }, [id]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const toggleSeatSelection = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(prevSelectedSeats => prevSelectedSeats.filter(s => s !== seat));
            setAgeCategories(prevAgeCategories => {
                const updated = { ...prevAgeCategories };
                delete updated[seat];
                return updated;
            });
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const handleAgeChange = (seat, age) => {
        setAgeCategories(prev => ({ ...prev, [seat]: age }));
    };

    const handleConfirmBooking = () => {
        if (!selectedDate || !selectedTime || selectedSeats.length === 0 || Object.keys(ageCategories).length !== selectedSeats.length) {
            alert('Please complete all selections before proceeding.');
            return;
        }

        // Pass selected data to the order summary page
        const orderData = {
            movieName: selectedMovie.movieName,
            selectedDate,
            selectedTime,
            selectedSeats,
            ageCategories,
        };

        // Navigate to OrderSummary page with state
        router.push({
            pathname: '/order-summary',
            query: orderData
        });
    };

    return (
        <div className="ticket-purchase-container">
            {selectedMovie ? (
                <div className="ticket-purchase-content">
                    <h1 className="movie-title">{selectedMovie.movieName}</h1>

                    <label htmlFor="showDate">Select a Date:</label>
                    <select id="showDate" value={selectedDate} onChange={handleDateChange}>
                        <option value="">--Select Date--</option>
                        {selectedMovie.showDates.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                    </select>

                    <label htmlFor="showTime">Select a Time:</label>
                    <select id="showTime" value={selectedTime} onChange={handleTimeChange} disabled={!selectedDate}>
                        <option value="">--Select Time--</option>
                        {selectedMovie.showTimes.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>

                    <h2 className="label">Select Seats:</h2>
                    <div className="seats-grid">
                        {seatLayout.map((row, rowIndex) => (
                            <div key={rowIndex} className="seat-row">
                                {row.map(seat => (
                                    <button
                                        key={seat}
                                        className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                                        onClick={() => toggleSeatSelection(seat)}
                                    >
                                        {seat}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>

                    {selectedSeats.length > 0 && (
                        <div className="age-inputs">
                            <h3>Age Categories for Selected Seats</h3>
                            {selectedSeats.map(seat => (
                                <div key={seat} className="age-category">
                                    <label htmlFor={`age-${seat}`}>Seat {seat}: </label>
                                    <select
                                        id={`age-${seat}`}
                                        value={ageCategories[seat] || ""}
                                        onChange={(e) => handleAgeChange(seat, e.target.value)}
                                    >
                                        <option value="">--Select Age--</option>
                                        <option value="Adult">Adult</option>
                                        <option value="Child">Child</option>
                                        <option value="Senior">Senior</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        className="confirm-button"
                        disabled={!selectedDate || !selectedTime || selectedSeats.length === 0 || Object.keys(ageCategories).length !== selectedSeats.length}
                    >
                        Confirm Booking
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}*/

"use client";

import React, { useState, useEffect } from 'react';
import { fetchMovieById } from '../../movieService';
import './page.css';
import { useRouter } from 'next/navigation'; // Corrected import for useRouter

export default function TicketPurchase({ params }) {
    const { id } = params; // Get the movie ID from params
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [ageCategories, setAgeCategories] = useState({}); // Track age for each seat
    const router = useRouter(); // Initialize router

    // Example seat layout
    const seatLayout = [
        ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
        ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
        ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
        ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"],
        ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"]
    ];

    useEffect(() => {

        // Check if the user is logged in
        const userRole = localStorage.getItem('userRole');
        if (!userRole) {
            // Redirect to login page if not logged in
            router.push('/login');
        }

        const fetchMovie = async () => {
            if (!id) return; // Check if id is present

            try {
                const movie = await fetchMovieById(id);
                setSelectedMovie(movie);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        fetchMovie();
    }, [id]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const toggleSeatSelection = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(prevSelectedSeats => prevSelectedSeats.filter(s => s !== seat));
            setAgeCategories(prevAgeCategories => {
                const updated = { ...prevAgeCategories };
                delete updated[seat];
                return updated;
            });
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const handleAgeChange = (seat, age) => {
        setAgeCategories(prev => ({ ...prev, [seat]: age }));
    };

    const handleConfirmBooking = () => {
        if (!selectedDate || !selectedTime || selectedSeats.length === 0 || Object.keys(ageCategories).length !== selectedSeats.length) {
            alert('Please complete all selections before proceeding.');
            return;
        }

        // Construct the order data string for query parameters
        const orderData = new URLSearchParams({
            movieName: selectedMovie.movieName,
            selectedDate,
            selectedTime,
            selectedSeats: JSON.stringify(selectedSeats), // Convert array to string for query
            ageCategories: JSON.stringify(ageCategories), // Convert object to string for query
        }).toString();

        // Navigate to OrderSummary page with query parameters
        router.push(`/OrderSummary?${orderData}`); // Using string format
    };



    return (
        <div className="ticket-purchase-container">
            {selectedMovie ? (
                <div className="ticket-purchase-content">
                    <h1 className="movie-title">{selectedMovie.movieName}</h1>

                    <label htmlFor="showDate">Select a Date:</label>
                    <select id="showDate" value={selectedDate} onChange={handleDateChange}>
                        <option value="">--Select Date--</option>
                        {selectedMovie.showDates.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                    </select>

                    <label htmlFor="showTime">Select a Time:</label>
                    <select id="showTime" value={selectedTime} onChange={handleTimeChange} disabled={!selectedDate}>
                        <option value="">--Select Time--</option>
                        {selectedMovie.showTimes.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>

                    <h2 className="label">Select Seats:</h2>
                    <div className="seats-grid">
                        {seatLayout.map((row, rowIndex) => (
                            <div key={rowIndex} className="seat-row">
                                {row.map(seat => (
                                    <button
                                        key={seat}
                                        className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                                        onClick={() => toggleSeatSelection(seat)}
                                    >
                                        {seat}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>

                    {selectedSeats.length > 0 && (
                        <div className="age-inputs">
                            <h3>Age Categories for Selected Seats</h3>
                            {selectedSeats.map(seat => (
                                <div key={seat} className="age-category">
                                    <label htmlFor={`age-${seat}`}>Seat {seat}: </label>
                                    <select
                                        id={`age-${seat}`}
                                        value={ageCategories[seat] || ""}
                                        onChange={(e) => handleAgeChange(seat, e.target.value)}
                                    >
                                        <option value="">--Select Age--</option>
                                        <option value="Adult">Adult</option>
                                        <option value="Child">Child</option>
                                        <option value="Senior">Senior</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        className="confirm-button"
                        onClick={handleConfirmBooking} // Call confirm booking on click
                        disabled={!selectedDate || !selectedTime || selectedSeats.length === 0 || Object.keys(ageCategories).length !== selectedSeats.length}
                    >
                        Confirm Booking
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}