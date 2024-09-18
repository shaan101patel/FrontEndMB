// src/Home.js
import React, { useState } from 'react';

const Home = () => {
    // State to manage current view/page
    const [view, setView] = useState('home');

    // Event handlers for switching between views
    const goToMovies = () => setView('movies');
    const goToBookings = () => setView('bookings');
    const goToAdmin = () => setView('admin');
    const goToHome = () => setView('home');

    return (
        <div className="home-container">
            {view === 'home' && (
                <>
                    <header>
                        <h1>Welcome to the Cinema E-Booking System</h1>
                        <p>Book your favorite movies from the comfort of your home!</p>
                    </header>

                    {/* Navigation buttons */}
                    <div className="navigation">
                        <button className="nav-button" onClick={goToMovies}>View Movies</button>
                        <button className="nav-button" onClick={goToBookings}>My Bookings</button>
                        <button className="nav-button" onClick={goToAdmin}>Admin Panel</button>
                    </div>
                </>
            )}

            {view === 'movies' && (
                <div>
                    <h2>Available Movies</h2>
                    <p>List of movies will go here...</p>
                    <button className="nav-button" onClick={goToHome}>Go Back</button>
                </div>
            )}

            {view === 'bookings' && (
                <div>
                    <h2>My Bookings</h2>
                    <p>Booking details will go here...</p>
                    <button className="nav-button" onClick={goToHome}>Go Back</button>
                </div>
            )}

            {view === 'admin' && (
                <div>
                    <h2>Admin Panel</h2>
                    <p>Admin management will go here...</p>
                    <button className="nav-button" onClick={goToHome}>Go Back</button>
                </div>
            )}
        </div>
    );
};

export default Home;
