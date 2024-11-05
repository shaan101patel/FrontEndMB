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


/*"use client";

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

                    <div className="relative pt-[56.25%] mb-4">
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
                currentlyRunning.length === 0 && comingSoon.length === 0 ? (
                    <p className="text-center text-red-500 font-semibold">No Movies Found</p>
                ) : (
                    renderMovies(activeSection === 'currentlyRunning' ? currentlyRunning : comingSoon)
                )
            )}
        </div>
    );
}*/

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
    const [selectedMovie, setSelectedMovie] = useState(null);

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

    // Handle click on movie poster to open modal
    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    // Handle close modal
    const closeModal = () => {
        setSelectedMovie(null);
    };

    // Render movies dynamically
    const renderMovies = (movies) => (
        <div className="flex flex-wrap justify-center gap-6">
            {movies.map(movie => (
                <div key={movie._id} className="relative border border-gray-300 rounded-lg shadow-lg p-4 w-64 text-center">
                    <img
                        src={movie.moviePoster}
                        alt={movie.movieName}
                        className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer"
                        onClick={() => handleMovieClick(movie)}
                    />
                    <h3 className="text-lg font-bold mb-2">{movie.movieName}</h3>
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
                currentlyRunning.length === 0 && comingSoon.length === 0 ? (
                    <p className="text-center text-red-500 font-semibold">No Movies Found</p>
                ) : (
                    renderMovies(activeSection === 'currentlyRunning' ? currentlyRunning : comingSoon)
                )
            )}

            {selectedMovie && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700 bg-gray-200 p-2 rounded-full shadow-md"
                            aria-label="Close"
                        >
                            ✖
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{selectedMovie.movieName}</h2>
                        <img
                            src={selectedMovie.moviePoster}
                            alt={selectedMovie.movieName}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <p><strong>Director:</strong> {selectedMovie.directorName}</p>
                        <p><strong>Producer:</strong> {selectedMovie.producer || 'N/A'}</p>
                        <p><strong>Year Released:</strong> {selectedMovie.yearReleased}</p>
                        <p><strong>Rating:</strong> {selectedMovie.movieRating}</p>
                        <p><strong>Length:</strong> {selectedMovie.movieLength}</p>
                        <p><strong>Description:</strong> {selectedMovie.shortDescription}</p>
                        <p><strong>Show Dates:</strong> {selectedMovie.showDates ? selectedMovie.showDates.join(', ') : 'N/A'}</p>
                        <p><strong>Show Times:</strong> {selectedMovie.showTimes ? selectedMovie.showTimes.join(', ') : 'N/A'}</p>

                        <div className="relative pt-[56.25%] mt-4">
                            <iframe
                                src={selectedMovie.trailerUrl.replace('watch?v=', 'embed/')}
                                title={selectedMovie.movieName}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
*/

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
``
import SearchBar from './search/page'; // Adjust the import as necessary
import { fetchMovies, searchMovies } from './movieService';

export default function Home() {
    const router = useRouter(); // Initialize useRouter
    const [currentlyRunning, setCurrentlyRunning] = useState([]);
    const [comingSoon, setComingSoon] = useState([]);
    const [activeSection, setActiveSection] = useState('currentlyRunning');
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);

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

    const handleSectionChange = (section) => setActiveSection(section);

    const handleSearch = async (query) => {
        if (!query) {
            const allMovies = await fetchMovies();
            setCurrentlyRunning(allMovies.currentlyRunning || []);
            setComingSoon(allMovies.comingSoon || []);
            return;
        }
        try {
            const results = await searchMovies(query);
            setCurrentlyRunning(results.filter(movie => movie.status === 'currentlyRunning'));
            setComingSoon(results.filter(movie => movie.status === 'comingSoon'));
        } catch (error) {
            console.error('Failed to search movies:', error);
        }
    };

    const handleMovieClick = (movie) => setSelectedMovie(movie);
    const closeModal = () => setSelectedMovie(null);

    const handleBookTicket = (movie) => {
        // Navigate to the tickets page with movie details
        router.push(`/tickets/${movie._id}`); // Use movie ID or any identifier for tickets page
    };

    const renderMovies = (movies) => (
        <div className="flex flex-wrap justify-center gap-6">
            {movies.map(movie => (
                <div key={movie._id} className="relative border border-gray-800 rounded-lg shadow-lg p-4 w-64 bg-gray-900 text-center hover:scale-105 transition-transform">
                    <img
                        src={movie.moviePoster}
                        alt={movie.movieName}
                        className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer"
                        onClick={() => handleMovieClick(movie)}
                    />
                    <h3 className="text-lg font-bold mb-2 text-white">{movie.movieName}</h3>
                    <p className="text-gray-400">{movie.movieRating} ★</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        onClick={() => handleBookTicket(movie)} // Handle button click
                    >
                        Book Ticket
                    </button>
                </div>
            ))}
        </div>
    );

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <header className="py-8 bg-dark-blue text-center text-4xl font-bold">
                Welcome to the Movie Booking System
            </header>
            <div className="hero-section py-16 text-center">
                <h2 className="text-5xl font-bold">Experience the Best Movies Here</h2>
                <p className="mt-4 text-lg">Book your tickets for the latest blockbusters now!</p>
            </div>
            <div className="container mx-auto p-8">
                <SearchBar onSearch={handleSearch} />
                <div className="my-6 flex justify-center">
                    <button
                        onClick={() => handleSectionChange('currentlyRunning')}
                        className={`mx-2 px-4 py-2 rounded ${activeSection === 'currentlyRunning' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                        Currently Running
                    </button>
                    <button
                        onClick={() => handleSectionChange('comingSoon')}
                        className={`mx-2 px-4 py-2 rounded ${activeSection === 'comingSoon' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                        Coming Soon
                    </button>
                </div>
                <h2 className="text-3xl font-semibold mb-4 text-center">
                    {activeSection === 'currentlyRunning' ? 'Currently Running Movies' : 'Coming Soon Movies'}
                </h2>
                {loading ? (
                    <p className="text-center text-gray-400">Loading movies...</p>
                ) : (
                    currentlyRunning.length === 0 && comingSoon.length === 0 ? (
                        <p className="text-center text-red-500 font-semibold">No Movies Found</p>
                    ) : (
                        renderMovies(activeSection === 'currentlyRunning' ? currentlyRunning : comingSoon)
                    )
                )}
                {selectedMovie && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="relative bg-gray-900 p-8 rounded-lg shadow-lg w-96">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700 bg-gray-700 p-2 rounded-full shadow-md"
                                aria-label="Close"
                            >
                                ✖
                            </button>
                            <h2 className="text-2xl font-bold mb-4">{selectedMovie.movieName}</h2>
                            <img
                                src={selectedMovie.moviePoster}
                                alt={selectedMovie.movieName}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <p><strong>Director:</strong> {selectedMovie.directorName}</p>
                            <p><strong>Producer:</strong> {selectedMovie.producer || 'N/A'}</p>
                            <p><strong>Year Released:</strong> {selectedMovie.yearReleased}</p>
                            <p><strong>Rating:</strong> {selectedMovie.movieRating}</p>
                            <p><strong>Length:</strong> {selectedMovie.movieLength}</p>
                            <p><strong>Description:</strong> {selectedMovie.shortDescription}</p>
                            <p><strong>Show Dates:</strong> {selectedMovie.showDates ? selectedMovie.showDates.join(', ') : 'N/A'}</p>
                            <p><strong>Show Times:</strong> {selectedMovie.showTimes ? selectedMovie.showTimes.join(', ') : 'N/A'}</p>
                            <div className="relative pt-[56.25%] mt-4">
                                <iframe
                                    src={selectedMovie.trailerUrl.replace('watch?v=', 'embed/')}
                                    title={selectedMovie.movieName}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
