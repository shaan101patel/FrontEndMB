import React, { useState } from 'react';

const TicketBooking = ({ movie }) => {
    const [selectedShowtime, setSelectedShowtime] = useState('');
    const [tickets, setTickets] = useState(1);
    const [isBooked, setIsBooked] = useState(false);

    // Check if the movie object exists and has a title
    if (!movie || !movie.title) {
        return <p>Loading movie details...</p>;
    }

    const handleShowtimeChange = (e) => {
        setSelectedShowtime(e.target.value);
    };

    const handleTicketChange = (e) => {
        setTickets(e.target.value);
    };

    const handleBooking = (e) => {
        e.preventDefault();
        // Handle booking logic (e.g., send booking info to the server)
        setIsBooked(true);
    };

    return (
        <div className="ticket-booking-container">
            {isBooked ? (
                <h2>Booking Confirmed! Enjoy your movie.</h2>
            ) : (
                <form onSubmit={handleBooking}>
                    <h1>Book Tickets for {movie.title}</h1>

                    <div className="form-group">
                        <label>Select Showtime:</label>
                        <select value={selectedShowtime} onChange={handleShowtimeChange} required>
                            <option value="">Select a showtime</option>
                            {movie.showtimes && movie.showtimes.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Number of Tickets:</label>
                        <input
                            type="number"
                            value={tickets}
                            min="1"
                            onChange={handleTicketChange}
                            required
                        />
                    </div>

                    <button type="submit" className="book-button">Book Now</button>
                </form>
            )}
        </div>
    );
};

export default TicketBooking;

