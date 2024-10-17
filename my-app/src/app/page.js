/*
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
                    textAlign: 'center',
                    overflow: 'hidden' // Ensures content stays inside the box
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


                    <div style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
                        <iframe
                            src={movie.trailerUrl.replace('watch?v=', 'embed/')}
                            title={movie.movieName}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover', // Ensures the video fits in the container
                                borderRadius: '8px'
                            }}
                        />
                    </div>
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
*/


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

    // Render movies dynamically
    const renderMovies = (movies) => (
        <div className="flex flex-wrap justify-center gap-6">
            {movies.map(movie => (
                <div key={movie._id} className="border border-gray-300 rounded-lg shadow-lg p-4 w-64 text-center">
                    <img
                        src={movie.moviePoster}
                        alt={movie.movieName}
                        className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer"
                    />
                    <h3 className="text-lg font-bold mb-2">{movie.movieName}</h3>
                    <p><strong>Director:</strong> {movie.directorName}</p>
                    <p><strong>Year Released:</strong> {movie.yearReleased}</p>
                    <p><strong>Rating:</strong> {movie.movieRating}</p>
                    <p><strong>Length:</strong> {movie.movieLength}</p>
                    <p><strong>Description:</strong> {movie.shortDescription}</p>

                    {/* YouTube Trailer Embed */}
                    <div className="relative pt-[56.25%] mb-4"> {/* 16:9 aspect ratio */}
                        <iframe
                            src={movie.trailerUrl.replace('watch?v=', 'embed/')}
                            title={movie.movieName}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                        />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-6 text-center">Welcome to the Movie Booking System</h1>
            <SearchBar onSearch={handleSearch} />

            <div className="my-6 flex justify-center">
                <button
                    onClick={() => handleSectionChange('currentlyRunning')}
                    className={`mx-2 px-4 py-2 rounded ${activeSection === 'currentlyRunning' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                    Currently Running
                </button>
                <button
                    onClick={() => handleSectionChange('comingSoon')}
                    className={`mx-2 px-4 py-2 rounded ${activeSection === 'comingSoon' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                    Coming Soon
                </button>
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-center">
                {activeSection === 'currentlyRunning' ? 'Currently Running Movies' : 'Coming Soon Movies'}
            </h2>

            {loading ? (
                <p className="text-center">Loading movies...</p>
            ) : (
                renderMovies(activeSection === 'currentlyRunning' ? currentlyRunning : comingSoon)
            )}
        </div>
    );
}






