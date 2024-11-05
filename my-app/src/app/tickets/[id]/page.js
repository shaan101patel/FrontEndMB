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

                    {/* Show Date Dropdown */}
                    <label htmlFor="showDate">Select a Date:</label>
                    <select id="showDate" value={selectedDate} onChange={handleDateChange}>
                        <option value="">--Select Date--</option>
                        {selectedMovie.showDates.map((date, index) => (
                            <option key={index} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>

                    {/* Show Time Dropdown */}
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



