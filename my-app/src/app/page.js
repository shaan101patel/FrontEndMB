"use client";

import React, { useEffect, useState } from 'react';
import SearchBar from './search/page';
import { fetchMovies, searchMovies } from './movieService';

export default function Home() {
    const [currentlyRunning, setCurrentlyRunning] = useState([]);
    const [comingSoon, setComingSoon] = useState([]);
    const [activeSection, setActiveSection] = useState('currentlyRunning');
    const [loading, setLoading] = useState(true);

    // Fetch all movies on component mount
    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            try {
                const movies = await fetchMovies();
                setCurrentlyRunning(movies.currentlyRunning || []);
                setComingSoon(movies.comingSoon || []);
            } catch (error) {
                console.error('Failed to load movies:', error);
            } finally {
                setLoading(false);
            }
        };
        loadMovies();
    }, []);

    // Handle section change
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    // Handle search functionality
    const handleSearch = async (query) => {
        if (!query) {
            const allMovies = await fetchMovies();
            setCurrentlyRunning(allMovies.currentlyRunning || []);
            setComingSoon(allMovies.comingSoon || []);
            return;
        }

        try {
            const results = await searchMovies(query);
            const filteredCurrentlyRunning = results.filter(movie => movie.status === 'currentlyRunning');
            const filteredComingSoon = results.filter(movie => movie.status === 'comingSoon');

            setCurrentlyRunning(filteredCurrentlyRunning);
            setComingSoon(filteredComingSoon);
        } catch (error) {
            console.error('Failed to search movies:', error);
        }
    };

    const renderMovies = (movies) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {movies.map(movie => (
                <div key={movie._id} style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    margin: '10px',
                    padding: '10px',
                    width: '200px',
                    textAlign: 'center'
                }}>
                    <img
                        src={movie.moviePoster}
                        alt={movie.movieName}
                        width="100%"
                        style={{ cursor: 'pointer' }}
                    />
                    <h3 style={{ fontSize: '1.2em', margin: '10px 0' }}>{movie.movieName}</h3>
                    <p><strong>Director:</strong> {movie.directorName}</p>
                    <p><strong>Year Released:</strong> {movie.yearReleased}</p>
                    <p><strong>Rating:</strong> {movie.movieRating}</p>
                    <p><strong>Length:</strong> {movie.movieLength}</p>
                    <p><strong>Description:</strong> {movie.shortDescription}</p>
                    <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">
                        Watch Trailer
                    </a>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Welcome to the Movie Booking System</h1>
            <SearchBar onSearch={handleSearch} />

            <div style={{ margin: '20px 0' }}>
                <button onClick={() => handleSectionChange('currentlyRunning')} style={{ marginRight: '10px' }}>
                    Currently Running
                </button>
                <button onClick={() => handleSectionChange('comingSoon')}>
                    Coming Soon
                </button>
            </div>

            <h2 style={{ fontSize: '1.5em', margin: '20px 0' }}>
                {activeSection === 'currentlyRunning' ? 'Currently Running Movies' : 'Coming Soon Movies'}
            </h2>
            {loading ? (
                <p>Loading movies...</p>
            ) : (
                renderMovies(activeSection === 'currentlyRunning' ? currentlyRunning : comingSoon)
            )}
        </div>
    );
}



